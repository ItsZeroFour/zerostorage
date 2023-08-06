import express from "express";
import checkAuth from "../utils/checkAuth.js";
import { ReviewController } from "../controllers/index.js";

const router = express.Router();

router.post("/create/:id", checkAuth, ReviewController.createReview);
router.patch("/update/:id", checkAuth, ReviewController.updateReview);
router.delete("/delete/:id", checkAuth, ReviewController.deleteReview);

export default router;
