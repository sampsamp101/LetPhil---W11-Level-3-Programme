import type {Product} from "../types/product.ts";
import { ProductCard } from "../components/ProductCard.tsx";

export const ProductGrid = ({products}: { products: Product[]}) => (
        <>
       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-8 mb-8">
            {products.map((product)=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
        </>
);
