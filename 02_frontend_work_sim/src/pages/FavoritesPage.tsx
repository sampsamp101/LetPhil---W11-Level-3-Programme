import { products } from "../data/products.ts";
import { EmptyState } from "../components/EmptyState.tsx";
import { ProductCard } from "../components/ProductCard.tsx";
import { favouriteStore } from "../store/favouriteStore.ts";

export const FavoritesPages = () => {
  const {favourites} = favouriteStore();
  const filteredFavouritesProducts = products.filter((product) => favourites.includes(product.id));
  return filteredFavouritesProducts.length === 0 ? (
    <div>
      <EmptyState message={"Your favorites are empty"} />
    </div>
  ) : (
    <div className="flex flex-col m-2 text-slate-900 dark:text-slate-100">
      <h1 className="font-bold text-3xl py-3">Your favorites</h1>
      <p className="text-gray-500 dark:text-slate-300">{favourites.length} saved products</p>
      <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-2 mb-8">
        {filteredFavouritesProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

