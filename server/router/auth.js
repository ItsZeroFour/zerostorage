import express from "express";
import { AuthController } from "../controllers/index.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/create", AuthController.createUser);
router.post("/login", AuthController.login);
router.get("/getUser", checkAuth, AuthController.getUser);

export default router;
