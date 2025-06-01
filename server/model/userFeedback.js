const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

exports.Feedback = mongoose.model("Feedback", FeedbackSchema);
