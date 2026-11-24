import { create } from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import { products } from "../data/products";
import type { CartItem } from "../types/cart";
import type { Order } from "../types/order";
import { emptyCheckoutForm, type CheckoutForm, type CheckoutStep } from "../types/checkout";

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
  totalPrice: number;
  setTotalPrice: (CartItem: CartItem[]) => void;
  checkoutForm: CheckoutForm;
  checkoutStep: CheckoutStep;
  updateCheckoutForm: (fields: Partial<CheckoutForm>) => void;
  setCheckoutStep: (step: CheckoutStep) => void;
  resetCheckout: () => void;
  order: Order | null;
  placeOrder: () => void;
  clearOrder: () => void;
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
    
    totalPrice: 0,
    setTotalPrice: (product) => {
        let totalPrice = 0;
      for (const { product: cartProduct, quantity } of product){
         totalPrice += parseFloat(String(cartProduct.price)) * quantity;
        }
      set({ totalPrice });
    },

    checkoutForm: emptyCheckoutForm,
    checkoutStep: 1 as const,

    updateCheckoutForm: (fields) =>
      set((state) => ({ checkoutForm: { ...state.checkoutForm, ...fields } })),
    setCheckoutStep: (step) => set({ checkoutStep: step }),
    resetCheckout: () => set({ checkoutForm: emptyCheckoutForm, checkoutStep: 1 }),
    order: null, 
    placeOrder: () => {
        const {cartItems, totalPrice, checkoutForm} = get();
        function getRandomInt(){
          return Math.floor(Math.random() * (9));
        } 
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        let randAlpha = ""
        let randNum = "";
        
        for (let i = 0; i < 3; i++){
          const randomIndex = Math.floor(Math.random() * alphabet.length);
          randAlpha += alphabet[randomIndex];
        }

        for (let i = 0; i < 6; i++){
            randNum += getRandomInt()
        }
        const confirmationNum = `#${randAlpha}-${randNum}`; 
        const newOrder = { orderNumber: confirmationNum, customerName: checkoutForm.fullName, items: cartItems, total: totalPrice};
        set({order: newOrder });
    },

    clearOrder: () => {
        set({order: null})    
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
    state.setTotalPrice(state.cartItems);
  }
});

useCartStore.getState().setTotalPrice(useCartStore.getState().cartItems);

