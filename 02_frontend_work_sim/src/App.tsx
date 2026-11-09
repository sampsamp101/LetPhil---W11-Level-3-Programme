import axios from "axios";
import { Navbar } from "./components/Navbar.tsx";
import { ProductGrid } from "./components/ProductGrid.tsx";
import { Footer } from "./components/Footer.tsx";
import { StatsBar } from "./components/StatsBar.tsx"; 
import { SearchBar } from "./components/SearchBar.tsx";
import { useState,useEffect } from 'react';
import { CartPanel } from "./components/CartPanel.tsx";
import type { CartItem } from "./types/cart.ts";
import type { Product } from "./types/product.ts";
import type { ProductResponse } from "./types/productResponse.ts";
import { SuggestProductForm } from "./components/SuggestProductForm.tsx";

function App(){
  const [products, setProducts] =  useState<Product[]>([])
  const [search, SetSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [favourites, setFavourites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const filteredSearchList = products.filter((product) => product.title.toLowerCase().includes(search));
  const noSearchResult = search.trim() !== "" && (filteredSearchList.length === 0);   
  const [cartPopup, setCartPopup] = useState<boolean>(false);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [errorFetching, setErrorFetching] = useState<boolean>(false);
  const [retryConnection, setRetryConnection] = useState<number>(0);

  let totalCurrentCart = 0;
  for (const {quantity} of cartItems){
      totalCurrentCart += quantity;
  }

  async function getProducts(url: string): Promise<ProductResponse> {
    try {
      setLoadingFetch(true);
      const response = await axios.get<ProductResponse>(url);
      return response.data;
    } catch (error: unknown) {
      setLoadingFetch(false);
      setErrorFetching(true);
      console.error(error);
      throw error;
    } finally{
      setLoadingFetch(false);
    }
  } 

  useEffect(()=> {
      // Instantly changes the text in the browser tab
      if (cartItems.length > 0){
          document.title = `SummerGear Market (${cartItems.length})`; 
      }
      else{
        document.title = `SummerGear Market`
      }
  }, [cartItems])

  useEffect(() => {
    const fetchProducts = async () => {
      const jsonProducts = await getProducts('https://dummyjson.com/products');
      setProducts(jsonProducts.products);
    };
    void fetchProducts();
    setLoadingFetch(true);
  }, [retryConnection]);

  return (
    <main className={`min-h-screen ${
    theme === "dark" ? "dark bg-gray-900 text-slate-100" : "bg-gray-50 text-slate-900"
    }`}>   
      <Navbar themeMode={theme} onChangeClickTheme = {(themeMode: string) => setTheme((themeMode === "light") ? "light" : "dark")} favouriteCounts = {favourites.length}  cartItems = {totalCurrentCart} onClickCartPopup = {setCartPopup}setPopupForm={setFormPopup}/>
    {
      loadingFetch ? 
      (
         <div id="loading-spinner" className="spinner">
                <div className="spin"></div>
                <p id="loading-message">Fetching Products...</p>
         </div>
      ) : 
       errorFetching ? 
      ( 
        <div id="error-box" className="mx-auto my-8 max-w-5xl rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <div className="text-4xl" aria-hidden="true">⚠️</div>
            <h2 className="mt-3 font-bold text-red-700">We couldn't load products</h2>
            <p className="mt-1 text-sm text-red-600">
              Something went wrong talking to the server. Check your connection and try again.
            </p>
            <button
              onClick={()=> setRetryConnection((prev)=> (prev + 1))}
              className="mt-4 rounded-md bg-emerald-800 px-4 py-2 text-sm font-semibold text-white cursor-pointer"
            >
              Try again
            </button>
        </div>
      ) :
      formPopup ? (
                <SuggestProductForm cartItems={cartItems} />
      ) : (
          <>
            {cartPopup && (
              <CartPanel
                numberCart={totalCurrentCart}
                cartItems={cartItems}
                setSavedCart={setCartItems}
              />
            )}
            <StatsBar products={products} />
            <SearchBar value={search} onChange={SetSearch} />
            <ProductGrid
              products={products}
              searchList={filteredSearchList}
              noResult={noSearchResult}
              favourites={favourites}
              setFavourites={setFavourites}
              savedCart={cartItems}
              setSavedCart={setCartItems}
            />    
          </>
      )}
      {Footer({ company: "SummitGear Market" }, { themeMode: theme })}
    </main>
  );
}

export default App;
