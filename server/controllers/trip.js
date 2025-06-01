const { TripData } = require("../model/trip");

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    console.log(req.body);
    const trip_details = req.body;

    const newTrip = new TripData(trip_details);
    await newTrip.save();
    console.log({ newTrip });

    res
      .status(201)
      .json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    console.log({ error });

    res.status(400).json({ error: error.message });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await TripData.find({});
    res.status(200).json(trips);
    console.log({ trips });
  } catch (error) {
    res.status(500).json({ err_msg: "Error while getting trip data" });
  }
};

exports.getTripsByUserEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.json();
    }

    const userTrips = await TripData.find({ user_email: email });

    res.status(200).json(userTrips);
  } catch (err) {
    res.status(500).json("Internal server error");
    console.log({ err });
  }
};

exports.deleteTripById = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedTrip = await TripData.findByIdAndDelete({ _id: id });

    res.json("Trip remove succefully");
  } catch (err) {
    res.json("Internal error.");
  }
};
