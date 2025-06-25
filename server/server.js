const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const preferenceRoutes = require("./routes/PreferenceRoutes");
app.use("/api", preferenceRoutes);

const workoutRoutes = require("./routes/WorkoutRoutes");
app.use("/api", workoutRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Workout Tracker API is running");
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
  app.listen(5000, () => console.log("Server running on port 5000"));
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


