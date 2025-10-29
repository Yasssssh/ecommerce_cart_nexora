import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: String, required: true },
});

const Product = mongoose.model("products", productsSchema);

export default Product;
