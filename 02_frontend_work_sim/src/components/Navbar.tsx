import dark from "../public/dark.png";
import light from "../public/light.png";

type typeSetTheme = {
  themeMode: "light" | "dark",
  onChangeClickTheme: ((themeMode: string) => void),
}

type NavbarProps = typeSetTheme & {
  favouriteCounts: number,
  cartItems: number,
  onClickCartPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

function handletheme({themeMode, onChangeClickTheme}: typeSetTheme){
  onChangeClickTheme((themeMode === "light") ? "dark" : "light");
}

export const Navbar = ({ themeMode, onChangeClickTheme, favouriteCounts, cartItems, onClickCartPopup}: NavbarProps) => (
<header
  className={`sticky top-0 z-50 w-full border-b ${
    themeMode === "dark"
      ? "border-slate-700 bg-slate-900 text-slate-100"
      : "border-slate-200 bg-white text-slate-900"
  }`}
>
    <nav
      aria-label="Main navigation"
      className="mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <a href="/" className={`text-2xl font-bold ${themeMode === "dark" ? "text-slate-100" : "text-gray-900"}`}>
        SummitGear Market
      </a>

      <ul className={`flex items-center gap-6 text-sm font-medium ${themeMode === "dark" ? "text-slate-200" : "text-gray-700"}`}>
        <li>
            <button className="hover:text-blue-600 dark:hover:text-blue-300">
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
    </nav>
  </header>
);