import express from "express";
import {
  addProductToCart,
  getCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
} from "../controllers/CartController.js";

const CartRouter = express.Router();

CartRouter.get("/getcart", getCart);
CartRouter.post("/addtocart", addProductToCart);
CartRouter.put("/updatequantity", updateProductQuantity);
CartRouter.delete("/removefromcart/:name", removeProductFromCart);
CartRouter.delete("/clearcart", clearCart);

export default CartRouter;
