import { products } from "../data/products";
import { useState } from "react";
import type {SuggestionLogType} from "../types/suggestion"; 

const MAX_REASON = 200;

export const SuggestProductForm = () => {
    const [suggestionHistory, setSuggestionHistory] = useState<SuggestionLogType[]>([]);
    const [name, setName] = useState("");
    const [reason, setReason] = useState("");
    const [category, setCategory] = useState("");
    const [showError, setShowError] = useState(false);
    const categoryList = [...new Set(products.map(product=>{
        return product.category;
    }))];
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        if (!name.trim() || !reason.trim()){
            setShowError(true);
            return;
        }
        const newRecord: SuggestionLogType= {productName: name.trim(), category: category.trim(), suggestionInput: reason.trim()}
        setSuggestionHistory((prev) => [...prev, newRecord]);
        setName("");
        setReason("");
        setCategory("");
        setShowError(false);
    }   

    return(
        <div className="flex flex-col m-2 text-slate-900 dark:text-slate-100">
           <h1 className="font-bold">Suggest a product</h1>
           <p className="text-gray-500 dark:text-slate-300">Tell us what you'd like to see in the store.</p>
           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                { showError 
                        &&
                        <div className="border-2 rounded-xl border-red-500 bg-red-50 dark:bg-red-950/30 p-2">
                           <p className="text-red-500 dark:text-red-400">Please fill out the product name and reason before submitting.</p>
                        </div>
                } 
                <div className="flex inline-flex gap-3">        
                    <label className="flex flex-col gap-1"> 
                    Product Name 
                        <input
                            className="rounded-xl border-2 border-slate-300 bg-white px-2 py-1 text-slate-900 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
                            type="text"
                            placeholder="e.g. Camping tent"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        Category
                        <select 
                        className="rounded-xl border-2 border-slate-300 bg-white px-2 py-1 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                        >
                        <option value="">Select a category</option>
                        {categoryList.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                        </select>
                    </label>
                </div>
                <label className="flex flex-col gap-1">
                    Why should we carry it? 
                    <textarea 
                    rows={4}
                    maxLength={MAX_REASON}
                    className="rounded-xl border-2 border-slate-300 bg-white px-2 py-1 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    value={reason}
                    onChange={(e)=> setReason(e.target.value)}
                    />
                </label>
                <button type="submit" className="rounded-xl bg-green-500 px-4 py-2 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500">
                    Submit suggestion
                </button>
            </form>
            <hr className="my-4 border-gray-300 dark:border-slate-600"></hr>
            <div className="flex flex-col">
                <h1 className="font-bold">Suggestions ({suggestionHistory.length})</h1>
                {suggestionHistory.map((suggestionlog, index) => (
                   <div
                        key={`${suggestionlog.productName}-${index}`}
                        className="rounded-xl border-2 border-gray-200 bg-white p-2 dark:border-slate-600 dark:bg-slate-800"
                    >
                  <div className="flex items-center justify-between gap-5 m-1.5">
                    <p className="font-semibold">{suggestionlog.productName}</p>
                    {suggestionlog.category && (
                        <p className="text-sm text-gray-500 dark:text-slate-300">{suggestionlog.category}</p>
                    )}
                </div>
                     <p className="[overflow-wrap:anywhere]">{suggestionlog.suggestionInput}</p>
                    </div>
                ))}
            </div>
         </div>    
    )   
}

