const express = require("express");
const {
  getAllFeedback,
  createFeedback,
} = require("../controllers/userFeedback");

const feedbackRouter = express.Router();

exports.feedbackRouter = feedbackRouter
  .get("/feedbacks", getAllFeedback)
  .post("/feedback", createFeedback);
