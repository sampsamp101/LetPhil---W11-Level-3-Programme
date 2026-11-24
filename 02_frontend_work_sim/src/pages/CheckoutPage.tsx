import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCartStore } from "../store/cartStore";
import {
    paymentSchema,
    shippingSchema,
    type CheckoutForm,
    type CheckoutStep,
} from "../types/checkout";

type FormErrors = Partial<Record<keyof CheckoutForm, string>>;

const STEPS: { n: CheckoutStep; label: string }[] = [
    { n: 1, label: "Shipping" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Review" },
];

const STEP_FIELDS: Record<1 | 2, (keyof CheckoutForm)[]> = {
    1: ["fullName", "address", "city", "zip"],
    2: ["cardName", "cardNumber", "expiry"],
};

// Reads the named inputs of a form as plain strings
const readFields = (form: HTMLFormElement, names: (keyof CheckoutForm)[]) => {
    const data = new FormData(form);
    return Object.fromEntries(names.map((n) => [n, String(data.get(n) ?? "")]));
};

type FieldProps = {
    label: string;
    name: keyof CheckoutForm;
    placeholder: string;
    defaultValue: string;
    error?: string;
};

const Field = ({ label, name, placeholder, defaultValue, error }: FieldProps) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="font-bold text-l">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="rounded-l border-1 p-1"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
);

export const CheckoutPage = () => {
    const {
        cartItems,
        totalPrice,
        checkMaxStock,
        setCartItems,
        checkoutForm,
        checkoutStep,
        updateCheckoutForm,
        setCheckoutStep,
        resetCheckout,
    } = useCartStore();
    const navigate = useNavigate();
    const {placeOrder} = useCartStore();
    const [errors, setErrors] = useState<FormErrors>({});
    const [placed, setPlaced] = useState(false);

    const goToStep = (step: CheckoutStep) => {
        setErrors({});
        setCheckoutStep(step);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (checkoutStep === 3) {
            placeOrder();
            setCartItems([]);
            resetCheckout();
            setPlaced(true);
            navigate("/order-confirmation")
            return;
        }

        const schema = checkoutStep === 1 ? shippingSchema : paymentSchema;
        const result = schema.safeParse(readFields(e.currentTarget, STEP_FIELDS[checkoutStep]));

        if (!result.success) {
            const next: FormErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof CheckoutForm;
                if (!next[field]) next[field] = issue.message;
            }
            setErrors(next);
            return;
        }

        updateCheckoutForm(result.data);
        goToStep((checkoutStep + 1) as CheckoutStep);
    };

    // Back saves what was typed (without validating) so nothing is lost
    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (checkoutStep === 1) {
            navigate("/cart");
            return;
        }
        if (e.currentTarget.form && checkoutStep === 2) {
            updateCheckoutForm(readFields(e.currentTarget.form, STEP_FIELDS[2]));
        }
        goToStep((checkoutStep - 1) as CheckoutStep);
    };

    if (placed) {
        return (
            <div className="mx-auto max-w-6xl px-6 py-8">
                <h1 className="text-2xl font-bold">Thank you for your order!</h1>
                <p className="mt-2">This was a demo checkout, so nothing was charged.</p>
                <Link to="/" className="mt-4 inline-block font-semibold text-emerald-800 underline">
                    Back to shop
                </Link>
            </div>
        );
    }

    const f = checkoutForm;

    return (
        <div className="mx-auto max-w-6xl px-6 py-8">
            <h1 className="text-2xl font-bold">Checkout</h1>

            {/* Progress indicator */}
            <div className="flex flex-wrap justify-between gap-y-4 mt-3">
                {STEPS.map(({ n, label }, i) => (
                    <span key={n} className="contents">
                        {i > 0 && <hr className="flex-1 self-center mx-4 my-4 border-t border-black" />}
                        <span className="inline-flex items-center gap-x-1">
                            <div
                                className={`flex items-center justify-center w-7 h-7 border-2 rounded-full ${
                                    n === checkoutStep
                                        ? "bg-emerald-800 border-emerald-800 text-white"
                                        : n < checkoutStep
                                        ? "border-emerald-800 text-emerald-800"
                                        : "border-gray-300"
                                }`}
                            >
                                {n < checkoutStep ? "✓" : n}
                            </div>
                            <p className="font-bold">{label}</p>
                        </span>
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <form noValidate className="grid grid-cols-1 py-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5 text-left rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
                        {checkoutStep === 1 && (
                            <>
                                <h2 className="font-bold">Shipping Address</h2>
                                <Field label="Full name" name="fullName" placeholder="John Doe..." defaultValue={f.fullName} error={errors.fullName} />
                                <Field label="Address" name="address" placeholder="Bay Area" defaultValue={f.address} error={errors.address} />
                                <section className="grid grid-cols-2 gap-4 max-w-6xl">
                                    <Field label="City" name="city" placeholder="Bay Area" defaultValue={f.city} error={errors.city} />
                                    <Field label="ZIP" name="zip" placeholder="1111-1111" defaultValue={f.zip} error={errors.zip} />
                                </section>
                            </>
                        )}

                        {checkoutStep === 2 && (
                            <>
                                <h2 className="font-bold">Payment</h2>
                                <Field label="Name on card" name="cardName" placeholder="John Doe" defaultValue={f.cardName} error={errors.cardName} />
                                <Field label="Card number" name="cardNumber" placeholder="1234 5678 9012 3456" defaultValue={f.cardNumber} error={errors.cardNumber} />
                                <Field label="Expiry" name="expiry" placeholder="MM/YY" defaultValue={f.expiry} error={errors.expiry} />
                            </>
                        )}

                        {checkoutStep === 3 && (
                            <>
                                <h2 className="font-bold">Review</h2>
                                <div>
                                    <h3 className="font-semibold">Shipping to</h3>
                                    <p>{f.fullName}</p>
                                    <p>{f.address}</p>
                                    <p>{f.city}, {f.zip}</p>
                                </div>
                                <div className="mt-2">
                                    <h3 className="font-semibold">Payment</h3>
                                    <p>{f.cardName}</p>
                                    <p>•••• •••• •••• {f.cardNumber.slice(-4)}</p>
                                    <p>Expires {f.expiry}</p>
                                </div>
                            </>
                        )}

                        <div className="mt-4 flex flex-wrap justify-between">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="rounded-xl border-2 p-2 font-semibold cursor-pointer hover:bg-gray-200"
                            >
                                ← {checkoutStep === 1 ? "Back to cart" : "Back"}
                            </button>
                            <button
                                type="submit"
                                disabled={checkoutStep === 3 && cartItems.length === 0}
                                className="rounded-xl bg-emerald-800 text-white font-semibold p-2 cursor-pointer hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {checkoutStep === 1 && "Next: Payment →"}
                                {checkoutStep === 2 && "Next: Review →"}
                                {checkoutStep === 3 && "Place order"}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Order summary */}
                <div className="grid grid-cols-1 py-8">
                    <div className="flex flex-col gap-1.5 text-left rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
                        <h2 className="font-bold">Order Summary</h2>
                        <ul className="divide-y divide-gray-300 dark:divide-slate-600">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="flex gap-4 py-4">
                                    <img src={item.product.thumbnail} alt={item.product.title} className="w-20 h-20 shrink-0 bg-blue-100 border rounded-sm dark:bg-slate-700" />
                                    <div className="flex flex-1 flex-col gap-1">
                                        <span>{item.product.title}</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            ${item.product.price.toFixed(2)} each · Qty {item.quantity}
                                        </span>
                                        {checkMaxStock(item.product.id) && (
                                            <span className="text-sm text-red-600 dark:text-red-400">Max stock reached</span>
                                        )}
                                    </div>
                                    <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap justify-between">
                            <h2>Total</h2>
                            <h2>${totalPrice.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
