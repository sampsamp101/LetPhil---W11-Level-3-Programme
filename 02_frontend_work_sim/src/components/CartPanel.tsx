import { products } from "../data/products";
import { EmptyState } from "./EmptyState";
import type { CartItem } from "../types/cart";

type cartType = {
    numberCart: number,
    cartItems: CartItem[],
    setSavedCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
}

export const CartPanel = ({ numberCart, cartItems, setSavedCart}: cartType) => {
    
    function handleDelete(productId: number){
        const productExists = cartItems.some((items) => (items.product.id === productId))
        if (productExists){
             return cartItems.filter((item)=> (item.product.id !== productId));
       }
    }

    function handleSubtract(productId:number){
        const productExists = cartItems.some((items) => (items.product.id === productId))
        if (productExists){
            const existingProduct = cartItems.find((item) => (item.product.id === productId));
            //bring it out
            if (!existingProduct){
                return;
            }
            //check if existingProduct quantity is already less or equal to 0 you can't subtract any further!
            if ((existingProduct?.quantity - 1) <= 0){       
                return cartItems.filter((item)=> (item.product.id !== productId));
            }
           return cartItems.map((item) => (item.product.id === productId) ? {...item, quantity: item.quantity - 1} :item) 
        }
    }

    function handleAddition(productId: number){
        const productExists = cartItems.some((items) => (items.product.id === productId));
        const existingProduct = cartItems.find((item) => (item.product.id === productId));
        const productRecords = products.find((item) => (item.id === productId));
        //bring it out
        if (!existingProduct || !productRecords){
            return;
        }
        //check if user has exceed the max stock for that particular product. you can't add any further
        if (existingProduct?.quantity >= productRecords?.stock){     
            return cartItems;    
        }
        if (productExists){
            return cartItems.map((item) => (item.product.id === productId) ? {...item, quantity: item.quantity + 1} :item) 
        }
        const product = products.find((item) => item.id === productId);
        if (!product) return;
        return cartItems = [...cartItems, { product, quantity: 1 }];
    }

    function checkMaxStock(productId: number) {
        const productExists = cartItems.some((items) => (items.product.id === productId));
        const existingProduct = cartItems.find((item) => (item.product.id === productId));
        const productRecords = products.find((item) => (item.id === productId));
        //bring it out
        if (!existingProduct || !productRecords){
            return false;
        }
        if (productExists){
            if (existingProduct?.quantity >= productRecords?.stock){     //also check if user has exceed the max stock for that particular product. you can't add any further
                return true;    
            }
        }
        return false;
    }

   return (
                <div className="fixed top-28 right-6 z-50 w-96 max-h-[70vh] overflow-y-auto rounded-xl border-2 border-slate-300 bg-white px-4 py-4 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                            <h1 className="font-semibold">Your cart ({numberCart})</h1>
                <hr className="my-4 border-gray-300 dark:border-slate-600" />
                    {(numberCart === 0) ? 
                    ( 
                        <div>
                            <EmptyState message={"Your cart is empty"}/>
                        </div>
                    ) : (
                        <>
                            <ul>
                                {
                                    cartItems.map((item)=>(
                                        <>
                                            <li key={item.product.id} className="flex gap-4">
                                                <img src={item.product.thumbnail} alt="product Image" className="w-24 h-24 bg-blue-100 border-1 rounded-sm dark:bg-slate-700"/>
                                                <div className="flex flex-col gap-x-1">
                                                    <div>{item.product.title}</div>
                                                    <div className="flex justify-between py-3 align-center">
                                                    <div className="flex inline-flex gap-15">
                                                        <span className="flex flex-col gap-1">
                                                            ${(item.product.price).toFixed(2)} each {
                                                                <h1 className="text-red-600 dark:text-red-400"> 
                                                                {(checkMaxStock(item.product.id)) ? "- max stock reached" : ""}
                                                                </h1>
                                                            }
                                                            <div className="flex items-center gap-1">
                                                                <button className="cursor-pointer hover:bg-blue-700 hover:text-white w-6 h-6 border-1 rounded-sm text-center border-slate-400 dark:border-slate-500 dark:hover:bg-blue-500" onClick={()=> setSavedCart(handleSubtract(item.product.id) ?? [])}>
                                                                    -
                                                                </button>
                                                                <div className="w-6 h-6 border-1 rounded-sm text-center border-slate-400 dark:border-slate-500">
                                                                    {item.quantity}
                                                                </div>
                                                                <button className="cursor-pointer hover:bg-blue-700 hover:text-white w-6 h-6 border-1 rounded-sm text-center border-slate-400 dark:border-slate-500 dark:hover:bg-blue-500"  onClick={()=> {setSavedCart(handleAddition(item.product.id) ?? [])}}>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </span>
                                                        <div className="flex flex-col gap-1">
                                                            <div>${(item.product.price * item.quantity).toFixed(2)}</div>
                                                            <button className="cursor-pointer hover:bg-red-700 hover:text-white hover:rounded-xl text-red-500 dark:text-red-400 dark:hover:bg-red-600" onClick={()=> setSavedCart(handleDelete(item.product.id) ?? [])}>Delete</button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <hr className="my-4 border-gray-300 dark:border-slate-600" />
                                        </>
                                    ))
                                }
                            </ul>
                        </>
                    )
                    }
                </div>
    );
};
