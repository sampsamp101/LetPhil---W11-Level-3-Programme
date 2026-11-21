import type { CartItem } from "../types/cart.ts";
import type { Product } from "../types/product.ts";
import heart from "../public/heart.png";
import nonheart from "../public/non_heart.png";
import { NavLink } from "react-router";

type ProductCardProps = {
  product: Product;
  favourites: number[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  savedCart: CartItem[];
  setSavedCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const ProductCard = ({ 
  product, 
  favourites, 
  setFavourites,
  savedCart, 
  setSavedCart }: ProductCardProps) => {
  const isFavourite = favourites.includes(product.id);

  const handleLikes = () => {
    setFavourites((currentFavourites) => {
      if (currentFavourites.includes(product.id)) {
        return currentFavourites.filter((id) => id !== product.id);
      }
      return [...currentFavourites, product.id];
    });
  };

  const handleSavedCart = () => {

    setSavedCart((cartItems)=> {
        const productExists = cartItems.some((items) => (items.product.id === product.id));
        if (productExists){
            return cartItems.map((item)=> (item.product.id === product.id) ? {...item, quantity: item.quantity + 1} : item) 
        }
        return [...cartItems, {product, quantity: 1}];
    })  
  }

  const currentProduct = savedCart.find((item) => item.product.id === product.id);
  const currentQuantity = currentProduct?.quantity ?? 0;
  const limitedExceeded = currentQuantity >= product.stock;

  return (
    <div key={product.id} className="w-fit max-w-sm rounded-lg border border-0.5 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
      <div className="relative w-64 h-64">
      <NavLink to={`/products/${product.id}`}>
        <img
          className="h-64 w-full object-contain bg-cyan-300 rounded-tl-lg rounded-tr-lg border border-1"
          src={product.thumbnail}
          alt={product.title}
        />
      </NavLink>
        <div className="absolute top-2 right-2">
          <button onClick={handleLikes} type="button">
            <img
              src={isFavourite ? heart : nonheart}
              alt={isFavourite ? "liked product" : "like button"}
              className="w-10 h-10"
            />
          </button>
        </div>
      </div>
      <p className="italic m-1.5">{product.brand}</p>
      <NavLink to={`/products/${product.id}`}>
        <p className="font-bold m-1.5">{product.title}</p>
      </NavLink>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="font-bold text-green-600 dark:text-green-400 m-1.5">${product.price.toFixed(2)}</p>
        <p className="italic m-1.5 text-slate-700 dark:text-slate-200">★ {product.rating}</p>
      </div>
      {product.stock < 10 && (
        <div className="m-1.5">
          <p className="font-extrabold text-red-600 dark:text-red-400 m-x-1.5">LOW STOCK</p>
          <div className="flex w-full items-center gap-0.2">
            <p className="font-bold">Current Stock:</p>
            <p className="italic m-1.5">{product.stock}</p>
          </div>
        </div>
      )}
      <button onClick={handleSavedCart} disabled={limitedExceeded} type="button" className="w-61 m-1.5 cursor-pointer">
          <p className={`border-2 rounded-xl text-slate-900 ${limitedExceeded ? "bg-gray-400 dark:bg-slate-600 dark:text-slate-200" : "bg-green-400 dark:bg-green-500"}`}>
            {
              (limitedExceeded) ? "Max in cart" : "Add to cart"
            }
            </p>
      </button>
    </div>
  );
};
