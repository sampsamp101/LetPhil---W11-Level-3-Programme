// This is your storefront. Each ticket adds a piece to it.
// Start with tickets/day-1/1.1-product-type-and-card.md
import { products } from "./data/products";
import { Navbar } from "./components/Navbar.tsx";
import { ProductGrid } from "./components/ProductGrid.tsx";
import {Footer} from "./components/Footer.tsx";

function App(){
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ProductGrid products={products}/>
      <Footer company="SummitGear Market"/>
    </main>
  );
}

export default App;


