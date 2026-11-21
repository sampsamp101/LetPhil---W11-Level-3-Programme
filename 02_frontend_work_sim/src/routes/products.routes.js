
import {Router} from "express";

import {
    GetProducts
} from "./controller/products.controllers.js";

const router = Router();

router.get("/:id", GetProducts)

