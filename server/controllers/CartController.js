import Cart from "../models/Cart.js";

const calculateCartTotal = (cart) => {
  if (!cart || cart.length === 0) {
    return 0;
  }

  return cart.reduce(
    (total, product) => total + product.price * product.qty,
    0
  );
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({});
    const total = calculateCartTotal(cart);

    res.json({ success: true, cart: cart, total: total });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.json({
        success: false,
        message: "Product name and price are required",
      });
    }

    const existingProduct = await Cart.findOne({ name: name });

    if (existingProduct) {
      existingProduct.qty += 1;
      await existingProduct.save();
    } else {
      const newProduct = new Cart({
        name: name,
        price: price,
        qty: 1,
      });

      await newProduct.save();
    }

    const updatedCart = await Cart.find({});
    const total = calculateCartTotal(updatedCart);
    res.json({ success: true, cart: updatedCart, total: total });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { name, action } = req.body;

    const product = await Cart.findOne({ name: name });

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (action === "increase") {
      product.qty += 1;
      await product.save();
    } else if (action === "decrease") {
      product.qty -= 1;
      if (product.qty <= 0) {
        await Cart.findOneAndDelete({ name: name });
      } else {
        await product.save();
      }
    } else {
      return res.json({ success: false, message: "invalid action" });
    }

    const updatedCart = await Cart.find({});
    const total = calculateCartTotal(updatedCart);
    res.json({ success: true, cart: updatedCart, total: total });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { name } = req.params;

    const deletedProduct = await Cart.findOneAndDelete({ name: name });

    if (!deletedProduct) {
      return res.json({ success: false, message: "Product not found in cart" });
    }

    const updatedCart = await Cart.find({});
    const total = calculateCartTotal(updatedCart);
    res.json({ success: true, cart: updatedCart, total: total });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ success: true, cart: [], total: 0 });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
