import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// PROCESS PAYMENT (POST /processPayment)
export const processPaymentThunk = createAsyncThunk(
  "payment/processPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:7500/processPayment", paymentData);
      return res.data; // { serverMsg, paymentStatus, paymentInfo }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { serverMsg: "Payment failed", paymentStatus: false }
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentInfo: null,
    paymentStatus: null, // success / failed
    loading: false,
    msg: "",
  },

  reducers: {
    clearPaymentMsg(state) {
      state.msg = "";
    },
  },

  extraReducers: (builder) => {
    // PROCESS PAYMENT -----------------------------
    builder.addCase(processPaymentThunk.pending, (state) => {
      state.loading = true;
      state.msg = "";
    });

    builder.addCase(processPaymentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload.serverMsg || "";
      state.paymentStatus = action.payload.paymentStatus;
      state.paymentInfo = action.payload.paymentInfo || null;
    });

    builder.addCase(processPaymentThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload?.serverMsg || "Payment error";
      state.paymentStatus = false;
    });
  },
});

export const { clearPaymentMsg } = paymentSlice.actions;
export default paymentSlice.reducer;
