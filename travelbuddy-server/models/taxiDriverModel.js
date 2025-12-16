// Taxi driver model
// © 2025 Travel Buddy. All rights reserved.

import mongoose from "mongoose"

const taxiDriverSchema = new mongoose.Schema(
  {
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    driverEmail: { type: String, required: true, unique: true },
    driverPassword: { type: String, required: true },
  },
  { timestamps: true }
)

const taxiDriverModel = mongoose.model("travel-buddy-drivers", taxiDriverSchema)
export default taxiDriverModel
