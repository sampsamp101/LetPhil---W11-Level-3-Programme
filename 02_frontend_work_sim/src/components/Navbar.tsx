import dark from "../public/dark.png";
import light from "../public/light.png";
import logo from "../public/favicon.svg";
import { useState, useEffect } from "react";

type typeSetTheme = {
  themeMode: "light" | "dark",
  onChangeClickTheme: ((themeMode: string) => void),
}

type NavbarProps = typeSetTheme & {
  favouriteCounts: number,
  cartItems: number,
  onClickCartPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function handletheme({themeMode, onChangeClickTheme}: typeSetTheme){
  onChangeClickTheme((themeMode === "light") ? "dark" : "light");
}

export const Navbar = ({ themeMode, onChangeClickTheme, favouriteCounts, cartItems, onClickCartPopup, setPopupForm}: NavbarProps) => {

      const [promotionNum, setPromotionNum] = useState(0);
      const [closedPromotion, setClosedPromotion] = useState(false);

      const promos = [
        "Free shipping on orders over $50.",
        "Weekend sale: up to 20% off selected products.",
        "Just landed: fresh picks in every category.",
        "Only a few left! Grab your favourites.",
        "New here? Take 10% off with code SUMMIT10.",
      ];
      useEffect(()=>{
          if (closedPromotion){
            return;
          }
          const IntervalId = setInterval(()=>{
                setPromotionNum((prev) => ((prev + 1)%promos.length))
          }, 4000);
          return () => clearInterval(IntervalId);
      }, [closedPromotion, promotionNum]);

      return(
        <header
          className={`sticky top-0 z-50 w-full border-b ${
            themeMode === "dark"
              ? "border-slate-700 bg-slate-900 text-slate-100"
              : "border-slate-200 bg-white text-slate-900"
          }`}
        >
          {
            !closedPromotion && (
              <div className="relative flex w-full items-center justify-center bg-emerald-800 py-2 text-sm font-medium text-white">
                <div>
                    <div className="flex items-center gap-4">
                      <p>{promos[promotionNum]}</p>

                      <div className="flex gap-2">
                        {promos.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setPromotionNum(index)}
                            aria-label={`Show promotion ${index + 1}`}
                            className={`h-2 w-2 rounded-full ${
                              index === promotionNum ? "bg-white" : "bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                </div>
                <button
                  onClick={() => setClosedPromotion(true)}
                  aria-label="Close promotion"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  x
                </button>
              </div>
            )}
            <nav
              aria-label="Main navigation"
              className="mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            > 
              <span className="flex items-center gap-3">
                <img src={logo} alt="Company image"/>
                <a href="/" className={`text-2xl font-bold ${themeMode === "dark" ? "text-slate-100" : "text-gray-900"}`}>
                  SummitGear Market
                </a>
              </span>
              
              <span className="flex items-center gap-2">
              <ul className={`flex items-center gap-6 text-sm font-medium ${themeMode === "dark" ? "text-slate-200" : "text-gray-700"}`}>
                <li>
                    <button className="hover:text-blue-600 dark:hover:text-blue-300" onClick={()=> setPopupForm((formPopup)=>(!formPopup) )}>
                      Shop
                    </button>
                </li>

                <li>
                  <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-300">
                      Favourites
                      <span className={`border-1 rounded-xl px-2 ${themeMode === "dark" ? "border-slate-500" : "border-slate-300"}`}>
                          {favouriteCounts}
                      </span>
                  </button>
                </li>

                <li>
                  <button onClick={()=> onClickCartPopup((cartPopUp)=> (!cartPopUp))}className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-300">
                      Cart
                        <span className={`border-1 rounded-xl px-2 ${themeMode === "dark" ? "border-slate-500" : "border-slate-300"}`}>
                          {cartItems}
                        </span>
                  </button>       
                </li>
              </ul>
              
              <button onClick={() => handletheme({ themeMode, onChangeClickTheme })}>
                <img className ="w-12 h-12" src={(themeMode === "light") ? light: dark} alt="Theme Icon"/>
              </button>
              </span>
            </nav>
          </header>
        );

      };