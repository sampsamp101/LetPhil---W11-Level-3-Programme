import { create } from "zustand";
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

export const useCartStore = create<cartType>((set, get) => ({
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
}));

useCartStore.subscribe((state, prevState) => {
  if (state.cartItems !== prevState.cartItems) {
    state.setTotalCurrentCart(state.cartItems);
  }
});
