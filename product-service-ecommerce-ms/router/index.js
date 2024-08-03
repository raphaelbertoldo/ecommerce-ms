import express from "express";
import ProductRouter from "../controllers/product.controller.js";
const router = express.Router();

router.use(express.json());
router.use(ProductRouter);

export default router;
