import type {Product} from "../types/product.ts";

export const ProductSection = ({title}: { title: Product["title"]}) => {
    return(
        <>
            <h1 className="text-xl px-8 font-bold mt-2 mb-2">{title}</h1>
        </>
    )
}