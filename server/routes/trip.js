const express = require("express");
const {
  getAllTrips,
  createTrip,
  getTripsByUserEmail,
  deleteTripById,
} = require("../controllers/trip");

const tripRouter = express.Router();

exports.tripRouter = tripRouter
  .post("/trip", createTrip)
  .get("/trips", getAllTrips)
  .get("/trip/email", getTripsByUserEmail)
  .delete("/trip/delete", deleteTripById);
