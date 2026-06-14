import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {socket} from '../../socket'
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://safe-wrapper-backend.onrender.com/api/users/login",
        payload,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          status: "fail",
          message: "Something went wrong",
        },
      );
    }
  },
);

const initialState = {
  loading: false,

  status: null,
  message: "",

  userDetails: null,
  sessionDetails: null,
  accountDetails: null,
  accountSettings: null,
};

const loginSlice = createSlice({
  name: "loginUser",

  initialState,

  reducers: {
    logout: (state) => {
      socket.disconnect()
      state.loading = false;

      state.status = null;
      state.message = "";

      state.userDetails = null;
      state.sessionDetails = null;
      state.accountDetails = null;
      state.accountSettings = null;

      // localStorage.removeItem("accessToken");
      localStorage.clear()
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;

        state.status = null;
        state.message = "";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        socket.connect()
        state.loading = false;

        state.status = action.payload.status;
        state.message = action.payload.message;

        state.userDetails = action.payload.data.userDetails;
        state.sessionDetails = action.payload.data.sesssionDetails;
        state.accountDetails = action.payload.data.accountDetails;
        state.accountSettings = action.payload.data.accountSettings;

        localStorage.setItem(
          "accessToken",
          action.payload.data.sesssionDetails.accessToken,
        );
        localStorage.setItem(
          "userDetails",
          JSON.stringify(action.payload.data.userDetails),
        );

        localStorage.setItem(
          "accountDetails",
          JSON.stringify(action.payload.data.accountDetails),
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.status = action.payload?.status || "fail";
        state.message = action.payload?.message || "Something went wrong";
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
