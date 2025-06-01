const mongoose = require("mongoose");

const TripDataSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  hotel_name: {
    type: String,
  },
  destination: {
    type: String,
    required: true,
  },
  no_of_guests: {
    type: String,
    required: true,
  },
  check_in_date: {
    type: String,
    required: true,
  },
  check_out_date: {
    type: String,
    required: true,
  },
});

exports.TripData = mongoose.model("TripData", TripDataSchema);
