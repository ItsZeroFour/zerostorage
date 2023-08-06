import { authReducer } from "./slices/auth";
import { productsReducer } from "./slices/products";
import { reviewsReducer } from "./slices/reviews";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    reviews: reviewsReducer,
  },
});

export default store;
