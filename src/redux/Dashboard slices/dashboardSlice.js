import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  loading: false,
  status: "",
  message: "",

  machineDropdownOptions: [],

  dashboardStatistics: null,

  error: null,
};

export const getMachineHeaders = createAsyncThunk(
  "dashboard/getMachineHeaders",
  async (_, thunkAPI) => {
    try {
      const accountDetails = JSON.parse(
        localStorage.getItem("accountDetails")
      );

      let response;

      if (accountDetails.accountType === "merchant") {
        response = await axiosInstance.get(
          `/merchants/machines/get-machine-payload-headers/${accountDetails.accountId}`
        );
      } else if (accountDetails.accountType === "super-admin") {
        response = await axiosInstance.get(
          `/machines/get-machine-payload-headers`
        );
      }

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

export const getDashboardStatistics = createAsyncThunk(
  "dashboard/getDashboardStatistics",
  async (_, thunkAPI) => {
    try {
      const accountDetails = JSON.parse(
        localStorage.getItem("accountDetails")
      );

      let response;

      if (accountDetails.accountType === "merchant") {
        response = await axiosInstance.get(
          `/merchants/machines/get-dashboard-statistics/${accountDetails.accountId}`
        );
      } else if (accountDetails.accountType === "super-admin") {
        response = await axiosInstance.get(
          `/machines/get-dashboard-statistics`
        );
      }

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

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},
extraReducers: (builder) => {
  builder

    // ==========================
    // MACHINE HEADERS
    // ==========================

    .addCase(getMachineHeaders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(getMachineHeaders.fulfilled, (state, action) => {
      state.loading = false;

      state.status = action.payload.status;
      state.message = action.payload.message;

      state.machineDropdownOptions =
        action.payload.data.webhookPayloadHeadersData.serialNumbers;
    })

    .addCase(getMachineHeaders.rejected, (state, action) => {
      state.loading = false;

      state.status = action.payload?.status;
      state.message = action.payload?.message;

      state.error = action.payload;
    })



    // ==========================
    // DASHBOARD STATISTICS
    // ==========================

    .addCase(getDashboardStatistics.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(getDashboardStatistics.fulfilled, (state, action) => {
      state.loading = false;

      state.status = action.payload.status;
      state.message = action.payload.message;

      state.dashboardStatistics = action.payload.data;
    })

    .addCase(getDashboardStatistics.rejected, (state, action) => {
      state.loading = false;

      state.status = action.payload?.status;
      state.message = action.payload?.message;

      state.error = action.payload;
    });
},
});

export default dashboardSlice.reducer;