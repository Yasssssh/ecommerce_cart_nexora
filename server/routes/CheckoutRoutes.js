import express from "express";
import { SaveCheckout } from "../controllers/CheckoutController.js";

const CheckoutRouter = express.Router();

CheckoutRouter.post("/checkout", SaveCheckout);

export default CheckoutRouter;
