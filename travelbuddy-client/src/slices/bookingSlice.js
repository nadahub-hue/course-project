import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// CONFIRM BOOKING 
export const confirmBookingThunk = createAsyncThunk(
  "booking/confirmBooking",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:7500/confirmBooking", data);
      return res.data; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { serverMsg: "Booking failed" }
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    currentBooking: null,
    loading: false,
    msg: "",
  },

  reducers: {
    clearBookingMsg(state) {
      state.msg = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(confirmBookingThunk.pending, (state) => {
      state.loading = true;
      state.msg = "";
    });
    builder.addCase(confirmBookingThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload.serverMsg || "";
      state.currentBooking = action.payload.booking || null;
    });
    builder.addCase(confirmBookingThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload?.serverMsg || "Booking error";
    });
  },
});

export const { clearBookingMsg } = bookingSlice.actions;
export default bookingSlice.reducer;
