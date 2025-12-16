import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";
import driverReducer from "../slices/driverSlice";
import adminReducer from "../slices/adminSlice";
import tripReducer from "../slices/tripSlice";
import bookingReducer from "../slices/bookingSlice";
import paymentReducer from "../slices/paymentSlice";
import feedbackReducer from "../slices/feedbackSlice";

const travelBuddyStore = configureStore({
  reducer: {
    user: userReducer,
    driver: driverReducer,
    admin: adminReducer,
    trip: tripReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    feedback: feedbackReducer
  }
});

export default travelBuddyStore;
