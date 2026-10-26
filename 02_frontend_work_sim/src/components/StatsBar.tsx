import type {Product} from "../types/product.ts";

export const StatsBar = ({products}: {products:Product[]}) => {

    const total_units = products.reduce((acc, currentProduct)=>{
        return acc + currentProduct.stock;
    }, 0)


    const total_inventory_val = products.reduce((acc, currentProduct)=>{
        return acc + currentProduct.price;
    }, 0);

    // 1. Create the formatter object
    const price_formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    });

    const moneyFormat = price_formatter.format(total_inventory_val);

    const totalRatings = products.reduce((acc, currentProduct)=>{
        return acc + currentProduct.rating;
    }, 0);
    const avgRating = (totalRatings / products.length).toFixed(1);

    const lowStockfilter = products.filter((product)=> (product.stock < 10));

    const lowStockProducts = lowStockfilter.length;

    return (
    <>
    <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 mt-2 mb-8">
         <div className="flex flex-col w-64 max-w-sm rounded-lg border border-0.5">
                <p className="m-1.5 inline-flex font-bold ml-4">UNITS IN STOCK</p>
                <p className = "m-1.5 inline-flex ml-4">{new Intl.NumberFormat().format(total_units)}</p>
         </div>

        <div className="flex flex-col w-64 max-w-sm rounded-lg border border-0.5">
                <p className="m-1.5 inline-flex font-bold ml-4">INVENTORY VALUE</p>
                <p className = "m-1.5 inline-flex ml-4">{moneyFormat}</p>                
         </div>

         <div className="flex flex-col w-64 max-w-sm rounded-lg border border-0.5">
                <p className="m-1.5 inline-flex font-bold ml-4">AVERAGE RATING</p>
                <p className = "flex inline-flex items-center font-bold m-1.5 gap-2 ml-4">
                    <p className = "text-lg">★</p>
                    {avgRating}
                </p>
         </div>

         <div className="flex flex-col w-64 max-w-sm rounded-lg border border-0.5">
                <p className="m-1.5 inline-flex font-bold ml-4">LOW STOCK</p>
                <p className = "font-bold m-1.5 inline-flex text-amber-500 text-2xl ml-4">{lowStockProducts} products</p>
         </div>

    </div>
    </>
    )


}   
