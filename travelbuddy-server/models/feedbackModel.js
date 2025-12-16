import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String }
  },
  { timestamps: true }
)

const feedbackModel = mongoose.model("travel-buddy-feedbacks", feedbackSchema)
export default feedbackModel
