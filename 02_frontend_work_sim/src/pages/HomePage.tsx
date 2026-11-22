import { useState } from "react";
import { products } from "../data/products.ts";
import { ProductGrid } from "../components/ProductGrid.tsx";
import { StatsBar } from "../components/StatsBar.tsx";
import { SearchBar } from "../components/SearchBar.tsx";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  
  const filteredSearchList = products.filter((product) =>
    product.title.toLowerCase().includes(search)
  );

  const noSearchResult = search.trim() !== "" && filteredSearchList.length === 0;
  
  return (
    <>
      <StatsBar products={products} />
      <SearchBar value={search} onChange={setSearch} />
      <ProductGrid
        products={products}
        searchList={filteredSearchList}
        noResult={noSearchResult}
        />
    </>
  );
};
