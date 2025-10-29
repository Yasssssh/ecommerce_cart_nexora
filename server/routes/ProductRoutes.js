import express from "express";
import {
  addProduct,
  getAllProducts,
} from "../controllers/ProductController.js";

const ProductsRouter = express.Router();

ProductsRouter.get("/", getAllProducts);
ProductsRouter.post("/add", addProduct);

export default ProductsRouter;
