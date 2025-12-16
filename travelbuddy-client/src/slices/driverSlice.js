import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// REGISTER DRIVER THUNK
export const newDriverThunk = createAsyncThunk(
  "driver/register",
  async (driverData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:7500/driverRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(driverData)
      });

      const data = await res.json();
      return data; // {serverMsg, flag}
    } catch (err) {
      return rejectWithValue({ flag: false, serverMsg: "Driver register failed" });
    }
  }
)

// driver login
export const driverLoginThunk = createAsyncThunk("driverSlice/driverLoginThunk", async (driverData, { rejectWithValue }) => {
  try {
    const res = await axios.post("http://localhost:7500/driverLogin", driverData)
    return res.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err.response?.data || err.message)
  }
})

const driverInitialState = {
  driver: null,
  msg: null,
  loading: false
}

const driverSlice = createSlice({
  name: "driver",
  initialState: {
    msg: "",
    driver: null,
    loading: false,
    isLoggedIn: false
  },
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.driver = null;
      state.msg = "";
    }
  },
  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(newDriverThunk.pending, (state) => {
        state.loading = true;
        state.msg = "";
      })
      .addCase(newDriverThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.serverMsg || "";
      })
      .addCase(newDriverThunk.rejected, (state, action) => {
        state.loading = false;
        state.msg = action.payload?.serverMsg || "Driver registration failed";
      });

    // LOGIN
    builder
      .addCase(driverLoginThunk.pending, (state) => {
        state.loading = true;
        state.msg = "";
      })
      .addCase(driverLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.serverMsg || "";
        state.isLoggedIn = !!action.payload.loginStatus;
        if (action.payload.loginStatus) {
          state.driver = action.payload.driver;
        }
      })
      .addCase(driverLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.msg = action.payload?.serverMsg || "Driver login failed";
        state.isLoggedIn = false;
      });
  }
});

export const { logout } = driverSlice.actions;

export default driverSlice.reducer
