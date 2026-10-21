import type {Product} from "../types/product.ts";

export const ProductCard = ({product}: { product: Product}) => {
    return(
        <>
            <div className="w-fit max-w-sm rounded-lg border border-0.5">
                <img className = "h-64 w-auto object-contain bg-cyan-300 rounded-tl-lg rounded-tr-lg border border-1" src={product.thumbnail}
                alt={product.title}/>   
                <p className="italic m-1.5">{product.brand}</p>
                <p className = "font-bold m-1.5">{product.title}</p>
                <div className="flex w-full items-center justify-between gap-4">
                    <p className="font-bold text-green-500 m-1.5">${product.price.toFixed(2)}</p>
                    <p className="italic m-1.5">★ {product.rating}</p>
                </div>
            </div>
        </>
    )
}