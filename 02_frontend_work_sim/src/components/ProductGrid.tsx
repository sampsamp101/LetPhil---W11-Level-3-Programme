import type { CartItem } from "../types/cart.ts";
import type { Product } from "../types/product.ts";
import { ProductCard } from "../components/ProductCard.tsx";
import { EmptyState } from "./EmptyState.tsx";

type ProductGridProps = {
  products: Product[];
  categorySection?: string;
  searchList?: Product[];
  noResult: boolean;
  favourites: number[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  savedCart: CartItem[];
  setSavedCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const ProductGrid = ({
  products,
  categorySection,
  searchList,
  noResult,
  favourites,
  setFavourites,
  savedCart,
  setSavedCart
}: ProductGridProps) => {
  if (products.length === 0 || noResult) {
    return (
      <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-2 mb-8">
        <EmptyState message="No products here yet" category={categorySection} />
      </div>
    );
  }

  if (searchList) {
    return (
      <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-2 mb-8">
        {searchList.map((product) => (
          <ProductCard key={product.id} product={product} favourites={favourites} setFavourites={setFavourites} savedCart={savedCart} setSavedCart={setSavedCart} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-2 mb-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} favourites={favourites} setFavourites={setFavourites} savedCart={savedCart} setSavedCart={setSavedCart}/>
      ))}
    </div>
  );
};
