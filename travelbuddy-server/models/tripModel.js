import mongoose from "mongoose"

const tripSchema = new mongoose.Schema(
  {
    ownerEmail: { type: String, required: true },  // user who created the trip
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    travelDate: { type: Date, required: true },
    travelTime: { type: String, required: true },
    genderRestriction: { type: String, enum: ["any", "male", "female"], default: "any" },
    estimatedFare: { type: Number, default: 0 },
    maxCompanions: { type: Number, default: 3 }
  },
  { timestamps: true }
)

const tripModel = mongoose.model("travel-buddy-trips", tripSchema)
export default tripModel
