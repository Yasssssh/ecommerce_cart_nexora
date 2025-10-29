import Product from "../models/Products.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await req.body;

    if (
      !product.id ||
      !product.name ||
      !product.description ||
      product.price === null ||
      product.price === undefined ||
      (typeof product.price === "number" && product.price < 0) ||
      !product.rating
    ) {
      return res.json("missing info");
    }

    const newProduct = await Product.create(product);

    if (!newProduct)
      return res.json({ success: false, message: "failed to create thought" });

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
