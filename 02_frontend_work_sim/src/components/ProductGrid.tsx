import type {Product} from "../types/product.ts";
import { ProductCard } from "../components/ProductCard.tsx";
import { EmptyState } from "./EmptyState.tsx";

export const ProductGrid = ({
  products,
  categorySection,
}: {
  products: Product[];
  categorySection: string;
}) => {
        if (products.length === 0) {
            return( 
              <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-2 mb-8">
                <EmptyState message="No products here yet" category={categorySection} />
              </div>
            )
        }

        return(
            <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-2 mb-8">
                {products.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        )
};
