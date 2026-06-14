// http://localhost:8201/api/merchants/accounts/create-account

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://safe-wrapper-backend.onrender.com/api/merchants/accounts/create-account",
        payload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          status: "error",
          message: "Something went wrong",
        }
      );
    }
  }
);

const initialState = {
  loading: false,
  status: null,
  message: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearRegisterState: (state) => {
      state.loading = false;
      state.status = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.status = null;
        state.message = "";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || "error";
        state.message =
          action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearRegisterState } = registerSlice.actions;

export default registerSlice.reducer;