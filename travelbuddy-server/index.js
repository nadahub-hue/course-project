import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"; // Make sure 'fs' is imported

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log("===== ENVIRONMENT SETUP =====");

const possibleEnvPaths = [
  path.join(__dirname, ".env"),
  "/opt/render/project/src/.env",
  "/opt/render/project/src/travelbuddy-server/.env",
  path.join(process.cwd(), ".env"),
];


let envLoaded = false;
for (const envPath of possibleEnvPaths) {
  if (fs.existsSync(envPath)) {
    console.log(`✅ Found .env file at: ${envPath}`);
    dotenv.config({ path: envPath });
    envLoaded = true;
    break;
  }
}

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import session from "express-session";
import MongoStore from "connect-mongo";
import userModel from "./models/userModel.js";
import taxiDriverModel from "./models/taxiDriverModel.js";
import tripModel from "./models/tripModel.js";
import bookingModel from "./models/bookingModel.js";
import feedbackModel from "./models/feedbackModel.js";
import adminModel from "./models/adminModel.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const TravelBuddy_App = express();

TravelBuddy_App.use(express.json());
TravelBuddy_App.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

let mongoConnectionString;

if (process.env.MONGODB_URI) {
  mongoConnectionString = process.env.MONGODB_URI;
} else if (process.env.MONGODB_USERID && process.env.MONGODB_PASSWORD && process.env.MONGODB_CLUSTER) {
  // Construct from individual components
  const dbName = process.env.MONGODB_DATABASE || "travelbuddy";
  mongoConnectionString = `mongodb+srv://${process.env.MONGODB_USERID}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
} else {
  console.log("⚠️ Using fallback MongoDB connection");
  mongoConnectionString = "mongodb+srv://admin:admin123@cluster0.xg9lokz.mongodb.net/travelbuddy?retryWrites=true&w=majority";
}

console.log("Connecting to MongoDB...");
console.log("MongoDB URI:", mongoConnectionString.substring(0, mongoConnectionString.indexOf('@') + 1) + "***");

mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
})
.then(() => {
  console.log("✅ Database Connection Success !");
})
.catch((err) => {
  console.error("❌ Database Connection Failed:", err.message);
  console.error("Full error:", err);
  // Don't exit in production - let it retry
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

TravelBuddy_App.use(
  session({
    secret: process.env.SESSION_SECRET || "a-very-strong-secret-key",
    resave: false,
    saveUninitialized: false, // Changed to false for better security
    store: MongoStore.create({
      mongoUrl: mongoConnectionString,
      ttl: 24 * 60 * 60, // 24 hours
      autoRemove: 'native'
    }),
    cookie: { 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
  })
);

TravelBuddy_App.use(authRoutes);
TravelBuddy_App.use(paymentRoutes);

TravelBuddy_App.post("/userRegister", async (req, res) => {
  try {
    const exist = await userModel.findOne({ userEmail: req.body.email });
    if (exist) return res.json({ serverMsg: "User already exist !", flag: false });

    const encryptedPassword = await bcrypt.hash(req.body.pwd, 10);

    const newUser = await userModel.create({
      userName: req.body.fullName,
      userPhone: req.body.phone,
      userEmail: req.body.email,
      userPassword: encryptedPassword,
      userGender: req.body.gender,
      preferredGender: req.body.preferredGender || "any",
    });

    req.session.user = {
      id: newUser._id,
      email: newUser.userEmail,
      name: newUser.userName,
      role: 'user'
    };

    res.json({ serverMsg: "Registration Success !", flag: true, user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ serverMsg: "Registration error", flag: false });
  }
});

TravelBuddy_App.post("/userLogin", async (req, res) => {
  try {
    const user = await userModel.findOne({ userEmail: req.body.userEmail });
    if (!user) return res.json({ serverMsg: "User not found !", loginStatus: false });

    const ok = await bcrypt.compare(req.body.userPassword, user.userPassword);
    if (!ok) return res.json({ serverMsg: "Incorrect Password !", loginStatus: false });

    req.session.user = {
      id: user._id,
      email: user.userEmail,
      name: user.userName,
      role: 'user'
    };

    res.json({ 
      serverMsg: "Welcome", 
      loginStatus: true, 
      user: {
        _id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        userGender: user.userGender,
        preferredGender: user.preferredGender
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ serverMsg: "Login error", loginStatus: false });
  }
});

TravelBuddy_App.post("/driverRegister", async (req, res) => {
  try {
    const exist = await taxiDriverModel.findOne({ driverEmail: req.body.driverEmail });
    if (exist) return res.json({ serverMsg: "Driver already exists !", flag: false });

    const encryptedPassword = await bcrypt.hash(req.body.driverPassword, 10);

    const newDriver = await taxiDriverModel.create({
      driverName: req.body.driverName,
      driverPhone: req.body.driverPhone,
      driverEmail: req.body.driverEmail,
      driverPassword: encryptedPassword,
    });

    res.json({ serverMsg: "Driver Registration Success !", flag: true, driver: newDriver });
  } catch (err) {
    console.error("Driver registration error:", err);
    res.status(500).json({ serverMsg: "Driver Registration error", flag: false });
  }
});

TravelBuddy_App.post("/driverLogin", async (req, res) => {
  try {
    const driver = await taxiDriverModel.findOne({ driverEmail: req.body.driverEmail });
    if (!driver) return res.json({ serverMsg: "Driver not found !", loginStatus: false });

    const ok = await bcrypt.compare(req.body.driverPassword, driver.driverPassword);
    if (!ok) return res.json({ serverMsg: "Incorrect Password !", loginStatus: false });

    req.session.driver = {
      id: driver._id,
      email: driver.driverEmail,
      name: driver.driverName,
      role: 'driver'
    };

    res.json({ 
      serverMsg: "Welcome Driver", 
      loginStatus: true, 
      driver: {
        _id: driver._id,
        driverName: driver.driverName,
        driverEmail: driver.driverEmail,
        driverPhone: driver.driverPhone
      }
    });
  } catch (err) {
    console.error("Driver login error:", err);
    res.status(500).json({ serverMsg: "Driver login error", loginStatus: false });
  }
});

TravelBuddy_App.post("/adminLogin", async (req, res) => {
  try {
    const admin = await adminModel.findOne({ adminEmail: req.body.adminEmail });
    if (!admin) return res.json({ serverMsg: "Admin not found !", loginStatus: false });

    const ok = await bcrypt.compare(req.env.adminPassword, admin.adminPassword);
    if (!ok) return res.json({ serverMsg: "Incorrect Password !", loginStatus: false });

    req.session.admin = {
      id: admin._id,
      email: admin.adminEmail,
      role: 'admin'
    };

    res.json({ 
      serverMsg: "Welcome", 
      loginStatus: true, 
      admin: {
        _id: admin._id,
        adminEmail: admin.adminEmail
      }
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ serverMsg: "Login error", loginStatus: false });
  }
});

TravelBuddy_App.post("/createTrip", async (req, res) => {
  try {
    const trip = await tripModel.create({
      ownerEmail: req.body.ownerEmail,
      fromLocation: req.body.fromLocation,
      toLocation: req.body.toLocation,
      travelDate: req.body.travelDate,
      travelTime: req.body.travelTime,
      genderRestriction: req.body.genderRestriction || "any",
      estimatedFare: req.body.estimatedFare || 0,
      maxCompanions: req.body.maxCompanions || 3,
    });
    res.json({ serverMsg: "Trip created", flag: true, tripId: trip._id });
  } catch (err) {
    console.error("Trip creation error:", err);
    res.status(500).json({ serverMsg: "Trip creation error", flag: false });
  }
});

TravelBuddy_App.get("/searchTrips", async (req, res) => {
  try {
    const q = {};
    if (req.query.fromLocation) q.fromLocation = { $regex: req.query.fromLocation, $options: 'i' };
    if (req.query.toLocation) q.toLocation = { $regex: req.query.toLocation, $options: 'i' };
    if (req.query.gender && req.query.gender !== "any")
      q.genderRestriction = { $in: ["any", req.query.gender] };
    if (req.query.travelDate) q.travelDate = req.query.travelDate;

    const trips = await tripModel.find(q);
    res.json(trips);
  } catch (err) {
    console.error("Search trips error:", err);
    res.status(500).json({ serverMsg: "Search trips error" });
  }
});

TravelBuddy_App.post("/confirmBooking", async (req, res) => {
  try {
    const trip = await tripModel.findById(req.body.tripId);
    if (!trip) return res.status(404).json({ serverMsg: "Trip not found" });

    const participantCount = req.body.participantEmails?.length || 1;
    
    const booking = await bookingModel.create({
      tripId: req.body.tripId,
      participantEmails: req.body.participantEmails || [],
      totalFare: trip.estimatedFare || 0,
      farePerPerson: (trip.estimatedFare || 0) / participantCount,
      status: "confirmed",
      bookedAt: new Date()
    });

    res.json({ serverMsg: "Booking confirmed", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ serverMsg: "Booking error" });
  }
});

TravelBuddy_App.post("/processPayment", (req, res) => {
  res.json({
    serverMsg: "Payment successful",
    paymentStatus: true,
    paymentInfo: {
      bookingId: req.body.bookingId,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      transactionId: "TXN-" + Date.now(),
      timestamp: new Date()
    },
  });
});

TravelBuddy_App.post("/sendFeedback", async (req, res) => {
  try {
    const feedback = await feedbackModel.create({
      userEmail: req.body.userEmail,
      rating: req.body.rating,
      comment: req.body.comment,
      createdAt: new Date()
    });
    res.json({ serverMsg: "Feedback saved. Thank you!", feedbackId: feedback._id });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ serverMsg: "Feedback error" });
  }
});


TravelBuddy_App.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ serverMsg: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ serverMsg: "Logged out successfully" });
  });
});

TravelBuddy_App.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

TravelBuddy_App.get("/", (req, res) => {
  res.json({ 
    message: "Travel Buddy API is running.",
    version: "1.0.0",
    status: "active",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

const PORT = process.env.PORT || 10000;
TravelBuddy_App.listen(PORT, () => {
  console.log(`====================================`);
  console.log(`Travel Buddy Server running at port ${PORT} ...!`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================`);
});
