const express = require("express");
const router = express.Router(); // ✅ This line defines the router
const jwt = require("jsonwebtoken");
const Preference = require("../models/Preference");
const Workout = require("../models/Workout");

// Save preference
router.post("/preference", async (req, res) => {
  const { goal, muscles } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    let existing = await Preference.findOne({ userId });
    if (existing) {
      existing.goal = goal;
      existing.muscles = muscles;
      await existing.save();
    } else {
      const newPref = new Preference({ userId, goal, muscles });
      await newPref.save();
    }

    res.json({ message: "Preferences saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/last-workout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const lastWorkout = await Workout.findOne({ userId })
      .sort({ date: -1 }) // Most recent
      .limit(1);

    res.json(lastWorkout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching last workout" });
  }
});


module.exports = router;
