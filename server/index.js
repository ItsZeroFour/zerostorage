import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoutes from "./router/auth.js";
import productRoutes from "./router/product.js";
import reviewRoutes from "./router/reviews.js";
import multer from "multer";

const app = express();

// dotenv.config({ path: "./.env" });

/* CONSTANTS */
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* MIDDLEWARES */
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/review", reviewRoutes);

/* IMAGE UPLOAD */
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

/* START FUNCTION */
async function start() {
  try {
    await mongoose
      .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Mongo db connected successfully"))
      .catch((err) => console.log(err));

    app.listen(PORT, (err) => {
      if (err) return console.log("App crashed: ", err);
      console.log(`Server started successfully! Port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
