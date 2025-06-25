const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  muscles: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Preference", preferenceSchema);
