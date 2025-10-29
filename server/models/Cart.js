import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
