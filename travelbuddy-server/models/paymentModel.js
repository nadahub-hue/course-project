import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: false,
    },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["card"], default: "card" },
    transactionId: { type: String, required: true, unique: true },
    paymentStatus: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "success",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
