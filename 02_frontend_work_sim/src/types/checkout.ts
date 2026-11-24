import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  zip: z.string().trim().regex(/^\d{4,5}(-\d{4})?$/, "Enter a valid ZIP (e.g. 02134 or 1111-1111)"),
});

export const paymentSchema = z.object({
  cardName: z.string().trim().min(1, "Name on card is required"),
  // accept "1234 5678 9012 3456" or "1234-5678-9012-3456", store digits only
  cardNumber: z
    .string()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^\d{16}$/, "Card number must be 16 digits")),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY")
    .refine((v) => {
      const [mm, yy] = v.split("/").map(Number);
      const now = new Date();
      const year = now.getFullYear() % 100;
      return yy > year || (yy === year && mm >= now.getMonth() + 1);
    }, "Card has expired"),
});

// The single type for the whole checkout form
export type CheckoutForm = z.infer<typeof shippingSchema> & z.infer<typeof paymentSchema>;

export type CheckoutStep = 1 | 2 | 3;

export const emptyCheckoutForm: CheckoutForm = {
  fullName: "",
  address: "",
  city: "",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
};
