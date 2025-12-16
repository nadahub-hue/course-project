// ===================== ENV SETUP (MUST BE FIRST) =====================
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Required for ES Modules (__dirname replacement)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force-load .env from the SAME folder as index.js
dotenv.config({ path: path.join(__dirname, ".env") });

// DEBUG — remove later
console.log("===== ENV CHECK =====");
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists =", !!process.env.EMAIL_PASS);
console.log("PORT =", process.env.PORT);
console.log("ENV PATH =", path.join(__dirname, ".env"));
console.log("=====================");

// ===================== IMPORTS =====================
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import session from "express-session";

// Models
import userModel from "./models/userModel.js";
import taxiDriverModel from "./models/taxiDriverModel.js";
import tripModel from "./models/tripModel.js";
import bookingModel from "./models/bookingModel.js";
import feedbackModel from "./models/feedbackModel.js";
import adminModel from "./models/adminModel.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// ===================== APP SETUP =====================
const TravelBuddy_App = express();

TravelBuddy_App.use(express.json());
TravelBuddy_App.use(cors());

// ===================== SESSION =====================
TravelBuddy_App.use(
  session({
    secret: process.env.SESSION_SECRET || "a-very-strong-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set true only with HTTPS
  })
);

// ===================== ROUTES =====================
TravelBuddy_App.use(authRoutes);
TravelBuddy_App.use(paymentRoutes);

// ===================== DATABASE =====================
try {
  const TravelBuddy_App_ConnectionString = `mongodb+srv://${process.env.MONGODB_USERID}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}`;

  await mongoose.connect(TravelBuddy_App_ConnectionString, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    family: 4,
  });

  console.log("Database Connection Success !");
} catch (err) {
  console.error("Database Connection Failed:", err);
  process.exit(1);
}

// ===================== SERVER =====================
const PORT = process.env.PORT || 7500;
TravelBuddy_App.listen(PORT, () => {
  console.log(`Travel Buddy Server running at port ${PORT} ...!`);
});

// ================== USER REGISTRATION ==================
TravelBuddy_App.post("/userRegister", async (req, res) => {
  try {
    const exist = await userModel.findOne({ userEmail: req.body.email });
    if (exist) {
      return res.json({ serverMsg: "User already exist !", flag: false });
    }

    const encryptedPassword = await bcrypt.hash(req.body.pwd, 10);

    await userModel.create({
      userName: req.body.fullName,
      userPhone: req.body.phone,
      userEmail: req.body.email,
      userPassword: encryptedPassword,
      userGender: req.body.gender,
      preferredGender: req.body.preferredGender || "any",
    });

    res.json({ serverMsg: "Registration Success !", flag: true });
  } catch (err) {
    console.error("userRegister error:", err);
    res.status(500).json({ serverMsg: "Registration error", flag: false });
  }
});

// ================== USER LOGIN ==================
TravelBuddy_App.post("/userLogin", async (req, res) => {
  try {
    const userExist = await userModel.findOne({
      userEmail: req.body.userEmail,
    });

    if (!userExist) {
      return res.json({ serverMsg: "User not found !", loginStatus: false });
    }

    const matchPassword = await bcrypt.compare(
      req.body.userPassword,
      userExist.userPassword
    );

    if (!matchPassword) {
      return res.json({
        serverMsg: "Incorrect Password !",
        loginStatus: false,
      });
    }

    res.json({ serverMsg: "Welcome", loginStatus: true, user: userExist });
  } catch (err) {
    console.error("userLogin error:", err);
    res.status(500).json({ serverMsg: "Login error", loginStatus: false });
  }
});

// ================== DRIVER REGISTRATION ==================
TravelBuddy_App.post("/driverRegister", async (req, res) => {
  try {
    const driverExist = await taxiDriverModel.findOne({
      driverEmail: req.body.driverEmail,
    });

    if (driverExist) {
      return res.json({
        serverMsg: "Driver already exists !",
        flag: false,
      });
    }

    const encryptedPassword = await bcrypt.hash(
      req.body.driverPassword,
      10
    );

    await taxiDriverModel.create({
      driverName: req.body.driverName,
      driverPhone: req.body.driverPhone,
      driverEmail: req.body.driverEmail,
      driverPassword: encryptedPassword,
    });

    res.json({ serverMsg: "Driver Registration Success !", flag: true });
  } catch (err) {
    console.error("driverRegister error:", err);
    res.status(500).json({
      serverMsg: "Driver Registration error",
      flag: false,
    });
  }
});

// ================== DRIVER LOGIN ==================
TravelBuddy_App.post("/driverLogin", async (req, res) => {
  try {
    const driver = await taxiDriverModel.findOne({
      driverEmail: req.body.driverEmail,
    });

    if (!driver) {
      return res.json({
        serverMsg: "Driver not found !",
        loginStatus: false,
      });
    }

    const matchPassword = await bcrypt.compare(
      req.body.driverPassword,
      driver.driverPassword
    );

    if (!matchPassword) {
      return res.json({
        serverMsg: "Incorrect Password !",
        loginStatus: false,
      });
    }

    res.json({
      serverMsg: "Welcome Driver",
      loginStatus: true,
      driver,
    });
  } catch (err) {
    console.error("driverLogin error:", err);
    res.status(500).json({
      serverMsg: "Driver login error",
      loginStatus: false,
    });
  }
});

// ================== ADMIN LOGIN ==================
TravelBuddy_App.post("/adminLogin", async (req, res) => {
  try {
    const adminExist = await adminModel.findOne({
      adminEmail: req.body.adminEmail,
    });

    if (!adminExist) {
      return res.json({
        serverMsg: "Admin not found !",
        loginStatus: false,
      });
    }

    const matchPassword = await bcrypt.compare(
      req.body.adminPassword,
      adminExist.adminPassword
    );

    if (!matchPassword) {
      return res.json({
        serverMsg: "Incorrect Password !",
        loginStatus: false,
      });
    }

    res.json({
      serverMsg: "Welcome",
      loginStatus: true,
      admin: adminExist,
    });
  } catch (err) {
    console.error("adminLogin error:", err);
    res.status(500).json({
      serverMsg: "Login error",
      loginStatus: false,
    });
  }
});

// ================== PING ==================
TravelBuddy_App.get("/", (req, res) => {
  res.send("Travel Buddy API is running.");
});
