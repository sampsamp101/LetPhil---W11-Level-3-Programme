import type {Product} from "../types/product.ts";

export const ProductGrid = ({products}: { products: Product[]}) => (
        <>
       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-8 mb-8">
            {products.map((product)=>(
                <div key={product.id} className="w-fit max-w-sm rounded-lg border border-0.5">
                    <img className = "h-64 w-full object-contain bg-cyan-300 rounded-tl-lg rounded-tr-lg border border-1" src={product.thumbnail}
                    alt={product.title}/>   
                    <p className="italic m-1.5">{product.brand}</p>
                    <p className = "font-bold m-1.5">{product.title}</p>
                    <div className="flex w-full items-center justify-between gap-4">
                        <p className="font-bold text-green-500 m-1.5">${product.price.toFixed(2)}</p>
                        <p className="italic m-1.5">★ {product.rating}</p>
                    </div>
                    {product.stock < 10 
                    && 
                    <div className = "m-1.5">
                        <p className="font-extrabold text-red-600 m-x-1.5">LOW STOCK</p>
                           <div className="flex w-full items-center gap-0.2">
                            <p className="font-bold">Current Stock:</p>
                            <p className="italic m-1.5">{product.stock}</p>
                        </div>
                    </div>
                    }
                </div>
            ))}
        </div>
        </>
);