import { useCartStore } from "../store/cartStore"
import { NavLink } from "react-router";

export const OrderConfirmationPage = () => {
    const {order} = useCartStore();
    return(
        <>
            <div className="flex flex-col items-center text-center self-center">
                <div className="flex items-center justify-center align-center w-14 h-14 border-2 rounded-full bg-emerald-800 text-white text-2xl">✓</div>
                <h1>Thanks {order?.customerName}! Your order is in.</h1>
                <p>Order <span>{order?.orderNumber}</span>. A confirmation was sent to your email.</p>
                {/* Order summary */}
                <div className="grid grid-cols-1 w-full max-w-xl py-2">
                    <div className="flex flex-col gap-1.5 text-left rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
                        <h2 className="font-bold">Order Summary</h2>
                        <ul className="divide-y divide-gray-300 dark:divide-slate-600">
                            {order?.items.map((item) => (
                                <li key={item.product.id} className="flex gap-4 py-4">
                                    <img src={item.product.thumbnail} alt={item.product.title} className="w-20 h-20 shrink-0 bg-blue-100 border rounded-sm dark:bg-slate-700" />
                                    <div className="flex flex-1 flex-col gap-1">
                                        <span>{item.product.title}</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            ${item.product.price.toFixed(2)} each · Qty {item.quantity}
                                        </span>
                                    </div>
                                    <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap justify-between border-t border-gray-700 pt-4 dark:border-slate-600">
                            <h2>Total</h2>
                            <h2>${order?.total.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
            
                <NavLink to="/" className="border-2 rounded-xl mb-6 w-fit px-4 py-2 inline-block font-bold bg-emerald-800 dark:text-emerald-400 text-white">
                 Keep shopping
                </NavLink>
            </div>  
        </>
    )
}