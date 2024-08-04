import express from "express";
import { registerUser } from "../services/register.service.js";

const router = express.Router();

router.post(
  "/register",
  registerUser
  //  async (req, res) => {
  // try {
  //   // TODO - move this to service
  //   const result = await registerUser(req.body);
  //   if (result.status === 200) {
  //     res.status(200).send({ token: result.token });
  //   } else {
  //     res.status(result.status).send({ error: result.error });
  //   }
  // } catch (error) {
  //   console.error("[ERRO] ~ router.post", error);
  //   res.status(500).send({ error: "Internal server error" });
  // }
  // }
);

export default router;
