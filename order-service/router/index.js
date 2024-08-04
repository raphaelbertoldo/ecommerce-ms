import express from "express";
import OrderRouter from "../controllers/order.controller.js";
const router = express.Router();

router.use(express.json());
router.use(OrderRouter);

export default router;
