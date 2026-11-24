import type { CartItem } from "./cart";

export type Order = {
  orderNumber: string;
  customerName: string;
  items: CartItem[];    
  total: number;
};