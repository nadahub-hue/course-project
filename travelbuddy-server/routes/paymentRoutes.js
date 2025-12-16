import express from "express";
import crypto from "crypto";
import paymentModel from "../models/paymentModel.js";

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const { amount, paymentMethod, bookingId } = req.body;

    if (!amount) {
      return res.status(400).json({ flag: false, msg: "Amount is required" });
    }

    const payment = await paymentModel.create({
      amount,
      paymentMethod: paymentMethod || "card",
      bookingId: bookingId || null,
      transactionId: crypto.randomUUID(),
      paymentStatus: "success",
    });

    return res.json({ flag: true, msg: "Payment saved", payment });
  } catch (err) {
    console.log("PAYMENT ERROR:", err.message);
    return res.status(500).json({ flag: false, msg: err.message });
  }
});

export default router;
