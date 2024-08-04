import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    if (!email || !password) {
      return res.status(400).send({ error: "Missing correct credentials" });
    }
    if (!password) {
      return res.status(400).send({ error: "Missing password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.name, email: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).send({ token });
  } catch (error) {
    console.error("[ERRO] ~ on user login", error);
    res.status(500).send({ error: "Internal server error when validate user" });
  }
};
