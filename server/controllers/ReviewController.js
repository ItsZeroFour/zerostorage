import ReviewModel from "../models/Review.js";
import ProductModel from "../models/Product.js";

export const createReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const author = req.userId;
    const { dignity, unworthiness, images } = req.body;

    if (!dignity)
      return res.json({ message: "Please, the positive side of the goods" });
    if (!unworthiness)
      return res.json({
        message: "Please pay attention to the side of the product",
      });

    const newReview = new ReviewModel({
      dignity,
      unworthiness,
      images,
      author,
    });
    await newReview.save();

    try {
      await ProductModel.findByIdAndUpdate(productId, {
        $push: { reviews: newReview._id },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Failed to create review" });
    }

    res.json(newReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create review",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    ReviewModel.findOneAndDelete({
      _id: reviewId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Review not found",
          });
        }

        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed to delete review",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete review",
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    await ReviewModel.updateOne(
      {
        _id: reviewId,
      },
      {
        dignity: req.body.dignity,
        unworthiness: req.body.unworthiness,
        images: req.body.images,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update review",
    });
  }
};
