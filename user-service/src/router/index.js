import express from "express";
import registerRoutes from "../controllers/register.controller.js";
import login from "../controllers/login.controller.js";
const router = express.Router();

router.use(express.json());

router.use(registerRoutes, login);

export default router;
