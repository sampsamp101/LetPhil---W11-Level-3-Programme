import type {Product} from "../types/product.ts";

export function groupByCategory(products: Product[]): Record<string, Product[]> {
    
    const setCategory = new Set<string>();
    
    products.forEach((product)=>{

        const category = product.category.split("")[0].toUpperCase() + product.category.slice(1,product.category.split("").length);
        setCategory.add(category);
    });    

    const finalObj: Record<string, Product[]> = {};

    for (const category of setCategory) {
        finalObj[category] = products.filter((product) => product.category === category.toLowerCase());
    }

    console.log(finalObj);
    return finalObj;
};