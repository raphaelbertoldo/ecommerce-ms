import express from "express";
import { login } from "../services/login.service.js";
const router = express.Router();

router.post("/login", login);

export default router;
