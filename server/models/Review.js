import mongoose from "mongoose";

const ReviewModel = new mongoose.Schema(
  {
    dignity: {
      type: "String",
      require: true,
    },

    unworthiness: {
      type: "String",
      require: true,
    },

    images: {
      type: "Array",
      default: [],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewModel);
