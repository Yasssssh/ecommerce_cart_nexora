import Checkout from "../models/Checkout.js";
import Cart from "../models/Cart.js";

export const SaveCheckout = async (req, res) => {
  try {
    const { name, email, address, total, cart } = req.body;

    if (!name || !email || !address || !total) {
      return res.json({ success: false, message: "Missing required fields." });
    }

    const newCheckOut = new Checkout({
      name,
      email,
      address,
      cart,
      total,
    });

    res.json({ success: true, message: "Checkout saved successfully." });

    await newCheckOut.save();
  } catch (error) {
    res.json({
      success: false,
      message: "couldn't save checkout:" + error.message,
    });
  }
};
