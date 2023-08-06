import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  comments: [],
  loading: false,
};

export const fetchCreateReview = createAsyncThunk(
  "review/fetchCreateReview",
  async ({ productId, dignity, unworthiness, images }) => {
    try {
      const { data } = await axios.post(`/review/create/${productId}`, {
        productId,
        dignity,
        unworthiness,
        images,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchGetReviews = createAsyncThunk(
  "review/fetchReviews",
  async (id) => {
    try {
      const { data } = await axios.get(`/product/getReviews/${id}`);

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const reviewsSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    // Create review
    [fetchCreateReview.pending]: (state) => {
      state.loading = true;
    },

    [fetchCreateReview.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews.push(action.payload);
    },

    [fetchCreateReview.rejected]: (state) => {
      state.loading = false;
    },

    // Get reviews
    [fetchGetReviews.pending]: (state) => {
      state.loading = true;
    },

    [fetchGetReviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },

    [fetchGetReviews.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const reviewsReducer = reviewsSlice.reducer;
