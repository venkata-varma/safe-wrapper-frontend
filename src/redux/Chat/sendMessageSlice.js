import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",

  async (payload, thunkAPI) => {

    try {

      const response =
        await axiosInstance.post(
          "/chat/send-message",
          payload
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data
      );

    }
  }
);

const sendMessageSlice = createSlice({

  name: "sendMessage",

  initialState: {
    loading:false
  },

  reducers:{},

  extraReducers:(builder)=>{

    builder

      .addCase(
        sendMessage.pending,
        (state)=>{
          state.loading=true;
        }
      )

      .addCase(
        sendMessage.fulfilled,
        (state)=>{
          state.loading=false;
        }
      )

      .addCase(
        sendMessage.rejected,
        (state)=>{
          state.loading=false;
        }
      );

  }

});

export default sendMessageSlice.reducer;