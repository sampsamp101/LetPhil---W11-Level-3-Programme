import {products} from "./data/products.ts";

export const GetProducts = (req, res) => {
    const {id} = req.params;
    const productExists = products.find((product) => (product.id === id));
    if (!productExists){
        return res.status(404).send({"message": `Unable to find existing ${id}`})
    }
    return res.status(200).json(productExists);
}

