import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

type ProductDetailPageProps = {
  favourites: number[];
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  savedCart: CartItem[];
  setSavedCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const ProductDetailPage = ({
  favourites,
  setFavourites,
  savedCart,
  setSavedCart,
}: ProductDetailPageProps) => {
  // "/products/14" matched "/products/:id" → id is the string "14"
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Re-runs whenever the id in the URL changes.
  useEffect(() => {
    let ignore = false; // stops a slow, outdated response from overwriting a newer one

    const fetchProduct = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
        if (!ignore) setProduct(response.data);
      } catch (error) {
        console.error(error);
        if (!ignore) setNotFound(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    void fetchProduct();
    return () => {
      ignore = true;
    };
  }, [id]);

  const backLink = (
    <Link to="/" className="mb-6 inline-block font-bold text-emerald-800 dark:text-emerald-400">
      ← Back to shop
    </Link>
  );

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-8">
        {backLink}
        <div className="spinner">
          <div className="spin"></div>
          <p>Loading product...</p>
        </div>
      </section>
    );
  }

  if (notFound || !product) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-8">
        {backLink}
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900 dark:bg-red-950">
          <div className="text-4xl" aria-hidden="true">🔎</div>
          <h2 className="mt-3 text-lg font-bold text-red-700 dark:text-red-300">Product not found</h2>
          <p className="mt-1 text-red-600 dark:text-red-400">We couldn't find a product with id {id}.</p>
        </div>
      </section>
    );
  }

  const isFavourite = favourites.includes(product.id);
  const quantityInCart = savedCart.find((item) => item.product.id === product.id)?.quantity ?? 0;
  const maxReached = quantityInCart >= product.stock;

  const toggleFavourite = () => {
    setFavourites((current) =>
      current.includes(product.id)
        ? current.filter((favId) => favId !== product.id)
        : [...current, product.id]
    );
  };

  const addToCart = () => {
    setSavedCart((cart) => {
      const exists = cart.some((item) => item.product.id === product.id);
      if (exists) {
        return cart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...cart, { product, quantity: 1 }];
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      {backLink}

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
          <img src={product.thumbnail} alt={product.title} className="max-h-96 w-full object-contain" />
        </div>

        <div>
          {product.brand && (
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {product.brand}
            </p>
          )}
          <h1 className="mt-1 text-4xl font-bold">{product.title}</h1>

          <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              {product.category}
            </span>
            <span
              className={`rounded-full px-3 py-1 ${
                product.stock > 0
                  ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
              }`}
            >
              {product.stock > 0 ? `In stock · ${product.stock} left` : "Out of stock"}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              ★ {product.rating}
            </span>
          </div>

          <p className="mt-6 text-4xl font-bold text-emerald-800 dark:text-emerald-400">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-4 text-slate-600 dark:text-slate-300">{product.description}</p>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={addToCart}
              disabled={maxReached}
              className="flex-1 cursor-pointer rounded-lg bg-emerald-800 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {maxReached ? "Max in cart" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={toggleFavourite}
              className="cursor-pointer rounded-lg border border-slate-300 bg-white px-6 font-semibold text-red-600 dark:border-slate-600 dark:bg-slate-800 dark:text-red-400"
            >
              {isFavourite ? "♥ Favorited" : "♡ Favorite"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
