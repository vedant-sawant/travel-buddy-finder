const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "no_request",
      "awaiting_response",
      "pending",
      "accepted",
      "rejected",
    ],
    default: "no_request",
  },
  createdAt: { type: Date, default: Date.now },
});

exports.Request = mongoose.model("Request", requestSchema);
