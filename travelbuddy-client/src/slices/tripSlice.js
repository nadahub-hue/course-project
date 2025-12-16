import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// CREATE TRIP 
export const createTripThunk = createAsyncThunk(
  "trip/createTrip",
  async (tripData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:7500/createTrip", tripData);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || { serverMsg: "Trip creation failed", flag: false });
    }
  }
);

// SEARCH TRIPS 
export const searchTripsThunk = createAsyncThunk(
  "trip/searchTrips",
  async (query, { rejectWithValue }) => {
    try {
      const url = new URL("http://localhost:7500/searchTrips");

      Object.keys(query).forEach(key => {
        if (query[key]) url.searchParams.append(key, query[key]);
      });

      const res = await axios.get(url.toString());
      return res.data; 
    } catch (err) {
      return rejectWithValue({ serverMsg: "Search failed" });
    }
  }
);

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    trips: [],
    loading: false,
    msg: "",
  },

  reducers: {
    clearTripMsg(state) {
      state.msg = "";
    },
  },

  extraReducers: (builder) => {
    // CREATE TRIP -----------------------------
    builder.addCase(createTripThunk.pending, (state) => {
      state.loading = true;
      state.msg = "";
    });
    builder.addCase(createTripThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload.serverMsg || "";
    });
    builder.addCase(createTripThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload?.serverMsg || "Trip creation failed";
    });

    // SEARCH TRIPS -----------------------------
    builder.addCase(searchTripsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchTripsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.trips = action.payload || [];
    });
    builder.addCase(searchTripsThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload?.serverMsg || "Search failed";
    });
  }
});

export const { clearTripMsg } = tripSlice.actions;
export default tripSlice.reducer;
