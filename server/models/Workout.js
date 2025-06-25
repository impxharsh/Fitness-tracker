
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
    },
  ],
});

module.exports = mongoose.model("Workout", workoutSchema);
