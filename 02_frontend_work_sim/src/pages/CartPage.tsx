import type { CartItem } from "../types/cart";
import { CartPanel } from "../components/CartPanel.tsx";

type CartPageProps = {
  numberCart: number;
  cartItems: CartItem[];
  setSavedCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const CartPage = ({ numberCart, cartItems, setSavedCart }: CartPageProps) => (
  <CartPanel
    asPage
    numberCart={numberCart}
    cartItems={cartItems}
    setSavedCart={setSavedCart}
  />
);
