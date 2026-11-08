import { products } from "./data/products";
import { Navbar } from "./components/Navbar.tsx";
import { ProductGrid } from "./components/ProductGrid.tsx";
import { Footer } from "./components/Footer.tsx";
import { StatsBar } from "./components/StatsBar.tsx"; 
import { SearchBar } from "./components/SearchBar.tsx";
import { useState } from 'react';
import { CartPanel } from "./components/CartPanel.tsx";
import type { CartItem } from "./types/cart.ts";
import { SuggestProductForm } from "./components/SuggestProductForm.tsx";

function App(){
  const [search, SetSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [favourites, setFavourites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const filteredSearchList = products.filter((product) => product.title.toLowerCase().includes(search));
  const noSearchResult = search.trim() !== "" && (filteredSearchList.length === 0);   
  const [cartPopup, setCartPopup] = useState<boolean>(false);

  let totalCurrentCart = 0;
  for (const {quantity} of cartItems){
      totalCurrentCart += quantity;
  }

  return (
    <main className={`min-h-screen ${
    theme === "dark" ? "dark bg-gray-900 text-slate-100" : "bg-gray-50 text-slate-900"
    }`}>   
      <Navbar themeMode={theme} onChangeClickTheme = {(themeMode: string) => setTheme((themeMode === "light") ? "light" : "dark")} favouriteCounts = {favourites.length}  cartItems = {totalCurrentCart} onClickCartPopup = {setCartPopup}/>

      {cartPopup && <CartPanel numberCart={totalCurrentCart} cartItems={cartItems} setSavedCart={setCartItems}/>}
      <StatsBar products={products}/>
      <SearchBar value={search} onChange={SetSearch}/>  
      <ProductGrid products={products} searchList={filteredSearchList} noResult={noSearchResult} favourites={favourites} setFavourites={setFavourites} savedCart={cartItems} setSavedCart={setCartItems}/>
      <SuggestProductForm cartItems={cartItems}/>
      {Footer({ company: "SummitGear Market" }, { themeMode: theme })}
    </main>
  
  );
}

export default App;
