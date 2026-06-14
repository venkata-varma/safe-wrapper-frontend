import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const findOrCreateChatRoom = createAsyncThunk(
  "chat/findOrCreateChatRoom",

  async (receiverId, thunkAPI) => {
    try {

      const response = await axiosInstance.post(
        "/chat/find-or-create-chat-room-for-pair-of-users",
        {
          receiverId
        }
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong"
        }
      );

    }
  }
);

const initialState = {

  loading: false,

  success: false,

  message: "",

  chatRoom: null

};

const findOrCreateChatRoomSlice = createSlice({

  name: "findOrCreateChatRoom",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(findOrCreateChatRoom.pending, (state) => {

        state.loading = true;

      })

      .addCase(findOrCreateChatRoom.fulfilled, (state, action) => {

        state.loading = false;

        state.success = action.payload.success;

        state.message = action.payload.message;

        state.chatRoom = action.payload.chat;

      })

      .addCase(findOrCreateChatRoom.rejected, (state, action) => {

        state.loading = false;

        state.success = false;

        state.message =
          action.payload?.message || "Something went wrong";

      });

  }

});

export default findOrCreateChatRoomSlice.reducer;