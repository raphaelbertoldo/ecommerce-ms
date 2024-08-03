import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ error: "Invalid data" });
    }

    if (!password) {
      res.status(400).send({ error: "Missing password" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).send({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.name, email: newUser.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error: "Internal server error when validate user" });
  }
};

export { registerUser };
