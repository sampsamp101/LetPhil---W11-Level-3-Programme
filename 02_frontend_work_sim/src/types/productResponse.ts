import type { Product } from "../types/product.ts";

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

