import ProductModel from "../models/Product.js";
import Review from "../models/Review.js";
import UserModel from "../models/User.js";

export const createProduct = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      about: req.body.about,
      type: req.body.type,
      amount: req.body.amount,
      characteristics: req.body.characteristics,
      images: req.body.images,
    });

    const product = await doc.save();

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({
      [req.params.value]: +req.params.type,
    });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

export const getAfewProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({
      _id: { $in: JSON.parse(req.params.items) },
    });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findById(productId);

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await ProductModel.updateOne(
      { _id: productId },
      {
        title: req.body.title,
        about: req.body.about,
        type: req.body.type,
        amount: req.body.amount,
        characteristics: req.body.characteristics,
        images: req.body.images,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    ProductModel.findOneAndDelete({
      _id: productId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Product not found",
          });
        }

        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Can't delete product",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove product",
    });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const productId = await req.params.id;
    const userId = req.userId;

    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { cart: productId },
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to add product to cart",
    });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const productId = await req.params.id;
    const userId = req.userId;

    await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { cart: productId },
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove product to cart",
    });
  }
};

export const addProductToFavorites = async (req, res) => {
  try {
    const productId = await req.params.id;
    const userId = req.userId;

    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { favorites: productId },
      },
      {
        new: true,
      }
    );

    res.json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to add product to favorites",
    });
  }
};

export const removeProductFromFavorites = async (req, res) => {
  try {
    const productId = await req.params.id;
    const userId = req.userId;

    await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { favorites: productId },
      },
      {
        new: true,
      }
    );

    res.json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to add product to favorites",
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    const list = await Promise.all(
      product.reviews.map((review) => {
        return Review.findById(review).populate("author").exec();
      })
    );

    res.json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
};

export const orderProducts = async (req, res) => {
  try {
    const userId = req.userId;

    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { orders: req.body.items },
      },
      {
        new: true,
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to order products",
    });
  }
};
