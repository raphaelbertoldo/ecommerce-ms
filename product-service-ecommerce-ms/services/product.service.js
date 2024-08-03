import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ products });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// @TODO - set rules to only admin exec this
export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.create({ name, price, description });
    res
      .status(200)
      .send({ message: "Products create with success !", product });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
