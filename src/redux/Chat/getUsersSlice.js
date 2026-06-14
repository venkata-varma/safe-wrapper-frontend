import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getUsers = createAsyncThunk(
  "chat/getUsers",

  async (_, thunkAPI) => {
    try {

      const response = await axiosInstance.get(
        "/chat/get-all-users"
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || {
          status: "fail",
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
  users: [],
};

const getUsersSlice = createSlice({
  name: "getUsers",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.users = action.payload.data || [];
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.status = "fail";
        state.message =
          action.payload?.message || "Something went wrong";
      });
  },
});

export default getUsersSlice.reducer;