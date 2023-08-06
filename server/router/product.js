import express from "express";
import { ProductController } from "../controllers/index.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/create", checkAuth, ProductController.createProduct);
router.get("/getAll/:value/:type", ProductController.getAllProducts);
router.get("/getAfew/:items", checkAuth, ProductController.getAfewProducts);
router.get("/getOne/:id", ProductController.getOneProduct);
router.patch("/update/:id", checkAuth, ProductController.updateProduct);
router.delete("/delete/:id", checkAuth, ProductController.removeProduct);
router.put("/addToCart/:id", checkAuth, ProductController.addProductToCart);
router.put("/removeFromCart/:id", checkAuth, ProductController.removeProductFromCart);
router.put("/addToFavorites/:id", checkAuth, ProductController.addProductToFavorites);
router.put("/removeFromFavorites/:id", checkAuth, ProductController.removeProductFromFavorites);
router.put("/addToOrders", checkAuth, ProductController.orderProducts);
router.get("/getReviews/:id", ProductController.getReviews);

export default router;
