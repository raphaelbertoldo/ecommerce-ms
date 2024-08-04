import express from "express";
import { processOrder } from "../services/order.service.js";
const router = express.Router();

router.post("/:id", processOrder);

export default router;
