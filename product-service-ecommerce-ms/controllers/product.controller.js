import express from "express";
import { getAllProducts, createProduct } from "../services/product.service.js";
import { validateToken } from "../middlewares/index.js";
import { createNewOrder } from "../services/order.service.js";

const ProductRouter = express.Router();

ProductRouter.get("/products", getAllProducts);

ProductRouter.post("/create-product", validateToken, createProduct);

ProductRouter.post("/:id/new-order", validateToken, createNewOrder);

export default ProductRouter;
