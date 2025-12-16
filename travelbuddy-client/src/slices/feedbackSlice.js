import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendFeedbackThunk = createAsyncThunk(
  "feedback/sendFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:7500/sendFeedback", feedbackData);
      return res.data; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { serverMsg: "Feedback submission failed" }
      );
    }
  }
);

const feedbackInitialState = {
  loading: false,
  msg: "",
  success: false
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: feedbackInitialState,
  reducers: {
    clearFeedbackStatus(state) {
      state.msg = "";
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFeedbackThunk.pending, (state) => {
        state.loading = true;
        state.msg = "";
        state.success = false;
      })
      .addCase(sendFeedbackThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.serverMsg || "Feedback submitted";
        state.success = true;
      })
      .addCase(sendFeedbackThunk.rejected, (state, action) => {
        state.loading = false;
        state.msg = action.payload?.serverMsg || "Feedback submission error";
        state.success = false;
      });
  }
});

export const { clearFeedbackStatus } = feedbackSlice.actions;
export default feedbackSlice.reducer;
