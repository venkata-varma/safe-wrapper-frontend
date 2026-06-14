import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getMessagesOfChat = createAsyncThunk(
  "chat/getMessagesOfChat",

  async (chatId, thunkAPI) => {
    try {

      const response = await axiosInstance.get(
        `/chat/get-messages-of-chat/${chatId}`
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

const getMessagesSlice = createSlice({
  name: "getMessagesOfChat",

  initialState: {
    loading: false,
    messages: []
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(getMessagesOfChat.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMessagesOfChat.fulfilled, (state, action) => {

        state.loading = false;

        state.messages = action.payload.data;

      })

      .addCase(getMessagesOfChat.rejected, (state) => {

        state.loading = false;

      });

  }
});

export default getMessagesSlice.reducer;