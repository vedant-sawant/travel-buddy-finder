const { Feedback } = require("../model/userFeedback");

exports.createFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    console.log(feedbackData);

    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.log({ error });

    res.status(400).json({ error: error.message });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({}).sort({ created_at: -1 });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
