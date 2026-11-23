import { useCartStore } from "../store/cartStore";
import { EmptyState } from "./EmptyState";
type cartType = {
    asPage?: boolean, 
}
const popupClasses = "fixed top-28 right-6 z-50 w-96 max-h-[70vh] overflow-y-auto rounded-xl border-2";
const pageClasses = "mx-auto my-8 w-full max-w-3xl rounded-xl border";
export const CartPanel = ({asPage = false }: cartType) => {
    
    const { totalCurrentCart, cartItems, handleAddition, handleSubtraction, handleDelete, checkMaxStock } = useCartStore();

   return (
                <div className={`${asPage ? pageClasses : popupClasses} border-slate-300 bg-white px-4 py-4 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100`}>
                            <h1 className="font-semibold">Your cart ({totalCurrentCart})</h1>
                <hr className="my-4 border-gray-300 dark:border-slate-600" />
                    {(totalCurrentCart === 0) ? 
                    ( 
                        <div>
                            <EmptyState message={"Your cart is empty"}/>
                        </div>
                    ) : (
                        <>
                            <ul>
                                {
                                    cartItems.map((item)=>(
                                        <div key={item.product.id}>
                                            <li className="flex gap-4">
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
                                                                <button className="cursor-pointer hover:bg-blue-700 hover:text-white w-6 h-6 border-1 rounded-sm text-center border-slate-400 dark:border-slate-500 dark:hover:bg-blue-500" onClick={()=> (handleSubtraction(item.product.id) ?? [])}>
                                                                    -
                                                                </button>
                                                                <div className="w-6 h-6 border-1 rounded-sm text-center border-slate-400 dark:border-slate-500">
                                                                    {item.quantity}
                                                                </div>
                                                                <button className="cursor-pointer hover:bg-blue-700 hover:text-white w-6 h-6 border-1 rounded-sm text-center border-slate-400 dark:border-slate-500 dark:hover:bg-blue-500"  onClick={()=> {(handleAddition(item.product.id) ?? [])}}>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </span>
                                                        <div className="flex flex-col gap-1">
                                                            <div>${(item.product.price * item.quantity).toFixed(2)}</div>
                                                            <button className="cursor-pointer hover:bg-red-700 hover:text-white hover:rounded-xl text-red-500 dark:text-red-400 dark:hover:bg-red-600" onClick={()=> (handleDelete(item.product.id) ?? [])}>Delete</button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <hr className="my-4 border-gray-300 dark:border-slate-600" />
                                        </div>
                                    ))
                                }
                            </ul>
                        </>
                    )
                    }
                </div>
    );
};
