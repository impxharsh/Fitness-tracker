const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Workout = require("../models/Workout");

// Middleware to authenticate and extract user ID-- custom middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// 🔹 POST /api/workout - Save today's workout
router.post("/workout", authenticate, async (req, res) => {
  const { exercises } = req.body;

  try {
    const workout = new Workout({
      userId: req.userId,
      exercises,
      date: new Date(),
    });

    await workout.save();
    res.json({ message: "Workout saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 GET /api/workout-history - Get workout history
router.get("/workout-history", authenticate, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 GET /api/last-workout - Get the most recent workout
router.get("/last-workout", authenticate, async (req, res) => {
  try {
    const lastWorkout = await Workout.findOne({ userId: req.userId }).sort({ date: -1 });
    res.json(lastWorkout || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
