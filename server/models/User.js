import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "User",
    },

    cart: {
      type: Array,
      default: [],
      ref: "Product",
    },

    orders: {
      type: Array,
      default: [],
      ref: "Product",
    },

    favorites: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserModel", userSchema);
