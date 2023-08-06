import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (value) => {
    const { data } = await axios.get(`/product/getAll/${value[0]}/${value[1]}`);
    return data;
  }
);

export const fetchRemoveProducts = createAsyncThunk(
  "products/fetchRemoveProducts",
  async (id) => axios.delete(`/product/delete/${id}`)
);

export const fetchAddProductToCart = createAsyncThunk(
  "products/fetchAddProductToCart",
  async (id) => axios.put(`/product/addToCart/${id}`)
);

export const fetchAppProductsToOrders = createAsyncThunk(
  "products/fetchAppProductsToOrders",
  async (items) => axios.put("product/addToOrders", items)
);

const initialState = {
  products: {
    items: [],
    status: "loading",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    /* GET ALL PRODUCTS */
    [fetchProducts.pending]: (state) => {
      state.products.status = "loading";
    },

    [fetchProducts.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = "loaded";
    },

    [fetchProducts.rejected]: (state) => {
      state.products.items = [];
      state.products.status = "error";
    },

    /* ADD PRODUCT TO CART */
    [fetchAddProductToCart.pending]: (state) => {
      state.cart.items = [];
      state.cart.status = "loading";
    },

    [fetchAddProductToCart.fulfilled]: (state, action) => {
      state.cart.items = action.payload;
      state.cart.status = "loaded";
    },

    [fetchAddProductToCart.rejected]: (state) => {
      state.cart.items = [];
      state.cart.status = "error";
    },

    /* ADD PRODUCT TO ORDERS */
    [fetchAppProductsToOrders.pending]: (state) => {
      state.orders.items = [];
      state.orders.status = "loading";
    },

    [fetchAppProductsToOrders.fulfilled]: (state, action) => {
      state.orders.items = action.payload;
      state.orders.status = "loaded";
    },

    [fetchAppProductsToOrders.rejected]: (state) => {
      state.orders.items = [];
      state.orders.status = "error";
    },

    /* REMOVE PRODUCTS */
    [fetchRemoveProducts.pending]: (state, action) => {
      state.products.items = state.products.items.filter(
        (obj) => obj._id !== action.payload
      );
    },
  },
});

export const productsReducer = productsSlice.reducer;
