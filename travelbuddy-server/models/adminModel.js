// Admin model
// © 2025 Travel Buddy. All rights reserved.

import mongoose from "mongoose"

const adminSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true },
    adminEmail: { type: String, required: true, unique: true },
    adminPassword: { type: String, required: true }
  },
  { timestamps: true }
)

const adminModel = mongoose.model("travel-buddy-admins", adminSchema)
export default adminModel
