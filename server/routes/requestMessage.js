const express = require("express");
const {
  getRequestStatus,
  sendRequest,
  updateRequestStatus,
} = require("../controllers/requestMessage");
const router = express.Router();

// Route to get the status of a user's request to another user
router
  .get("/request/status", getRequestStatus)
  .post("/request/send", sendRequest) // Route to send a new request
  .post("/request/update", updateRequestStatus); // Route to update request status (accept/reject)

exports.requestRouter = router;
