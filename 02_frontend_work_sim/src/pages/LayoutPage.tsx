import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Everything Navbar and Footer need — App passes these in once, Layout hands them down.
type LayoutProps = {
  themeMode: "light" | "dark";
  onChangeClickTheme: (themeMode: string) => void;
  favouriteCounts: number;
  cartItems: number;
};

export const Layout = ({ themeMode, onChangeClickTheme, favouriteCounts, cartItems }: LayoutProps) => (
  <>
    <Navbar
      themeMode={themeMode}
      onChangeClickTheme={onChangeClickTheme}
      favouriteCounts={favouriteCounts}
      cartItems={cartItems}
    />
    <Outlet />
    <Footer company="SummitGear Market" themeMode={themeMode} />
  </>
);
