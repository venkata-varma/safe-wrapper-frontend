import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getLatestChatRooms = createAsyncThunk(
  "chat/getLatestChatRooms",

  async (_, thunkAPI) => {
    try {

      const response = await axiosInstance.get(
        "/chat/get-latest-chat-rooms-of-sender"
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );

    }
  }
);

const initialState = {

  loading: false,

  success: false,

  message: "",

  chatRooms: [],

};

const getLatestChatRoomsSlice = createSlice({

  name: "getLatestChatRooms",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(getLatestChatRooms.pending, (state) => {

        state.loading = true;

        state.success = false;

        state.message = "";

      })

      .addCase(getLatestChatRooms.fulfilled, (state, action) => {

        state.loading = false;

        state.success = action.payload.success;

        state.message = action.payload.message || "";

        state.chatRooms = action.payload.data || [];

      })

      .addCase(getLatestChatRooms.rejected, (state, action) => {

        state.loading = false;

        state.success = false;

        state.message =
          action.payload?.message || "Something went wrong";

      });

  },

});

export default getLatestChatRoomsSlice.reducer;