import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/create", params);

    return data;
  }
);

export const fetchLogin = createAsyncThunk(
  "/auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);

    return data;
  }
);

export const fetchGetUser = createAsyncThunk("/auth/fetchGetUser", async () => {
  const { data } = await axios.get("/auth/getUser");

  return data;
});

const initialState = {
  data: null,
  status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },

  extraReducers: {
    /* REGISTER */
    [fetchRegister.pending]: (state) => {
      state.status = null;
      state.data = null;
    },

    [fetchRegister.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.data = action.payload;
    },

    [fetchRegister.rejected]: (state, action) => {
      state.status = action.payload;
      state.data = null;
    },

    /* LOGIN */
    [fetchLogin.pending]: (state) => {
      state.status = null;
      state.data = null;
    },

    [fetchLogin.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.data = action.payload;
    },

    [fetchLogin.rejected]: (state, action) => {
      state.status = action.payload;
      state.data = null;
    },

    /* GET USER */
    [fetchGetUser.pending]: (state) => {
      state.status = null;
      state.data = null;
    },

    [fetchGetUser.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.data = action.payload;
    },

    [fetchGetUser.rejected]: (state, action) => {
      state.status = action.payload;
      state.data = null;
    },
  },
});

export const authReducer = authSlice.reducer;

export const selectIsAuth = (state) => state.auth.data;

export const { logout } = authSlice.actions;
