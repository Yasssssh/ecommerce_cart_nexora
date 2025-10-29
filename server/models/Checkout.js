import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  total: { type: Number, required: true },
  cart: { type: Array, required: true },
  paid: { type: Boolean, default: false },
});

const Checkout = mongoose.model("Checkout", checkOutSchema);

export default Checkout;
