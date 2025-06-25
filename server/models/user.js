const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  goals: String, //  bulky, lean, athletic etc
  muscleGroups: [String], // chest, legs etc
  workouts: [
    {
      date: String,
      exercises: [
        {
          name: String,
          sets: Number,
          reps: Number,
          weight: Number
        }
      ]
    }
  ],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("User", userSchema);
