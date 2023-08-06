import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    about: {
      type: String,
      require: true,
    },

    type: {
      type: String,
      require: true,
    },

    amount: {
      type: Number,
      require: true,
    },

    characteristics: {
      type: Array,
      default: [],
    },

    reviews: {
      type: Array,
      default: [],
    },

    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductModel", ProductSchema);
