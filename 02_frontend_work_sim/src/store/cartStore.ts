import { create } from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

import { products } from "../data/products";
import type { CartItem } from "../types/cart";

type cartType = {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void;
  addToCart: (product: CartItem["product"]) => void;    
  handleSavedCart: (product: CartItem["product"]) => void;
  handleAddition: (productId: number) => void;
  handleSubtraction: (productId: number) => void;
  handleDelete: (productId: number) => void;
  isMaxStockReached: boolean;
  checkMaxStock: (productId: number) => boolean;
  totalCurrentCart: number;
  setTotalCurrentCart: (cartItems: CartItem[]) => void;
}

export const useCartStore = create<cartType>()(
  persist(
    (set, get) => ({
  cartItems: [],
  isMaxStockReached: false,

  setCartItems: (items) =>
    set((state) => ({
      cartItems: typeof items === "function" ? items(state.cartItems) : items,
    })),

  addToCart: (product) =>
    set((state) => {
      const exists = state.cartItems.some((item) => item.product.id === product.id);
      if (exists) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, { product, quantity: 1 }] };
    }),
    
    handleSavedCart: (product) => 
        set((state)=>{
            const productExists = state.cartItems.some((items) => (items.product.id === product.id));
            if (productExists){
                return {
                    cartItems: state.cartItems.map((item)=> (item.product.id === product.id) ? {...item, quantity: item.quantity + 1} : item),
                };
            }
            return {cartItems: [...state.cartItems, {product, quantity: 1}]};
    }),
    
    handleAddition: (productId)=>
        set((state): Partial<cartType> => {
            const existingProduct = state.cartItems.find((item) => (item.product.id === productId));
            const productRecords = products.find((item) => (item.id === productId));
            if (!existingProduct || !productRecords || existingProduct.quantity >= productRecords.stock) {
                return {};
            }
            return {
                cartItems: state.cartItems.map((item)=> item.product.id === productId ? 
                {...item, quantity: item.quantity + 1}: item)
            };
        }),
    
    handleSubtraction: (productId)=>
        set((state): Partial<cartType> => {
            const productExists = state.cartItems.some((items) => (items.product.id === productId))
            if (productExists){
               const existingProduct = state.cartItems.find((item) => (item.product.id === productId));
               if (!existingProduct){
                    return {};
               }
               if ((existingProduct?.quantity - 1) <= 0){       
                    return {
                       cartItems: state.cartItems.filter((item)=> (item.product.id !== productId))
                    } 
                }
            }
             return {
                cartItems: state.cartItems.map((item) => (item.product.id === productId) ? {...item, quantity: item.quantity - 1} :item) 
             }
        }),
    
     handleDelete: (productId)=>
        set((state): Partial<cartType> =>{
              const productExists = state.cartItems.some((items) => (items.product.id === productId))
              if(productExists){
                return {
                    cartItems: state.cartItems.filter((item)=> (item.product.id !== productId))
                }
              }
          return {};
        }),
    
     checkMaxStock: (productId) => {
      const state = get();
      const existingProduct = state.cartItems.find((item) => item.product.id === productId);
      const productRecords = products.find((item) => item.id === productId);
      if (!existingProduct || !productRecords) {
        return false;
      }
      return existingProduct.quantity >= productRecords.stock;
     },

    totalCurrentCart: 0,

    setTotalCurrentCart: (product) => {
        let total = 0;
        for (const {quantity} of product){
            total += quantity;
        }
        set({ totalCurrentCart: total });
    },
    
    }),
    {
      name: "cart-store-save",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        cartItems: s.cartItems,
        totalCurrentCart: s.totalCurrentCart,
      }),
    },
  ),
);

useCartStore.subscribe((state, prevState) => {
  if (state.cartItems !== prevState.cartItems) {
    state.setTotalCurrentCart(state.cartItems);
  }
});





// # 7.3 — Persist the cart, favorites and theme
// ## Branch
// Before starting, create your branch:
// ```
// git checkout -b persist-store
// ```

// ## Description
// Refresh the page — the cart is gone. That's a bad store. Use Zustand's `persist` middleware to save state to `localStorage`.

// ## Mock
// No visual change. The difference is that the cart, favorites and theme are still there after a refresh.

// ## Acceptance Criteria
// - [ ] Cart, favorites and theme all survive a page refresh
// - [ ] Each store uses `persist` with its own unique `name` key
// - [ ] You can see the saved data in DevTools → Application → Local Storage
// - [ ] Adding an item in one tab and refreshing another tab shows the same cart

// ## Hints
// ```ts
// import { persist } from "zustand/middleware";

// export const useCartStore = create<CartState>()(
//   persist((set) => ({ /* same as before */ }), { name: "summitgear-cart" })
// );
// ```