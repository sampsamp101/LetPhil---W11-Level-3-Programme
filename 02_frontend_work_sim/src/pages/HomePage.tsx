import { useState } from "react";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";
import { ProductGrid } from "../components/ProductGrid.tsx";
import { CartPanel } from "../components/CartPanel.tsx";
import { StatsBar } from "../components/StatsBar.tsx";
import { SearchBar } from "../components/SearchBar.tsx";

type HomePageProps = {
  products: Product[];
  favourites: number[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  savedCart: CartItem[];
  setSavedCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartPopup: boolean;
};

export const HomePage = ({
  products,
  favourites,
  setFavourites,
  savedCart,
  setSavedCart,
  cartPopup,
}: HomePageProps) => {
  // Search is only used on the home screen, so its state lives here, not in App.
  const [search, setSearch] = useState("");
  const filteredSearchList = products.filter((product) =>
    product.title.toLowerCase().includes(search)
  );
  const noSearchResult = search.trim() !== "" && filteredSearchList.length === 0;

  // Derived from the cart passed in by App — no separate state needed.
  let totalCurrentCart = 0;
  for (const { quantity } of savedCart) {
    totalCurrentCart += quantity;
  }

  return (
    <>
      {cartPopup && (
        <CartPanel
          numberCart={totalCurrentCart}
          cartItems={savedCart}
          setSavedCart={setSavedCart}
        />
      )}
      <StatsBar products={products} />
      <SearchBar value={search} onChange={setSearch} />
      <ProductGrid
        products={products}
        searchList={filteredSearchList}
        noResult={noSearchResult}
        favourites={favourites}
        setFavourites={setFavourites}
        savedCart={savedCart}
        setSavedCart={setSavedCart}
      />
    </>
  );
};
