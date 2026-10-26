import { products } from "./data/products";
import { Navbar } from "./components/Navbar.tsx";
import { ProductGrid } from "./components/ProductGrid.tsx";
import { ProductSection } from "./components/ProductSection.tsx";
import { Footer } from "./components/Footer.tsx";
import { StatsBar } from "./components/StatsBar.tsx"; 
import { groupByCategory } from "./utils/groupByCategory.ts";

function App(){
  const productsObj = groupByCategory(products); 

  return (  
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <StatsBar products={products}/>
      <h1 className="text-xl px-8 font-bold mt-2 mb-2">Shop by Category</h1>
      {Object.entries(productsObj).map(([productCategory, products]) => {
        return(
          <div key={productCategory}>
            <ProductSection title={productCategory} />
            <ProductGrid products={products} categorySection={productCategory} />
          </div>
        );
      })}
      
      <Footer company="SummitGear Market"/>
    </main>
  );
}

export default App;


