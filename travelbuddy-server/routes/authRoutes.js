import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/userModel.js";

// ===================== LOAD ENV HERE (CRITICAL) =====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

// ===================== ROUTER =====================
const router = express.Router();

// ===================== TRANSPORTER (AFTER dotenv) =====================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional but VERY useful
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer config error:", error.message);
  } else {
    console.log("✅ Nodemailer is ready to send emails");
  }
});

// ===================== FORGOT PASSWORD =====================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ userEmail: email });
    if (!user) {
      return res.json({ flag: false, msg: "Email not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExp = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"Travel Buddy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Travel Buddy - Reset your password",
      html: `
        <p>Hello ${user.userName || ""},</p>
        <p>You requested to reset your password.</p>
        <p>Click the link below (valid for 1 hour):</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you did not request this, please ignore.</p>
      `,
    });

    res.json({
      flag: true,
      msg: "Reset link has been sent to your email.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ flag: false, msg: "Server error" });
  }
});

// ===================== RESET PASSWORD =====================
router.post("/reset-password-email", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExp: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ flag: false, msg: "Invalid or expired link" });
    }

    user.userPassword = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();

    res.json({ flag: true, msg: "Password has been reset successfully." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ flag: false, msg: "Server error" });
  }
});

export default router;
