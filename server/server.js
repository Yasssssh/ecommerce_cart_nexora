import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import ProductsRouter from "./routes/ProductRoutes.js";
import CartRouter from "./routes/CartRoutes.js";
import CheckoutRouter from "./routes/CheckoutRoutes.js";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));

await connectDB();

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/products", ProductsRouter);
app.use("/api/cart", CartRouter);
app.use("/api", CheckoutRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
