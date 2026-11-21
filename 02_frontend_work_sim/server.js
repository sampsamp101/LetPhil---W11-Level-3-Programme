import express from "express";
import ProductsRouter from "./src/routes/products.routes"

const app = express();

app.use("/products", ProductsRouter);

app.listen(3000, ()=> console.log("Server starting on port: 3000"));
