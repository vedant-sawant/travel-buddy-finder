const { Place } = require("../model/places");

// Fetch places with search filter, and pagination
exports.getPlaces = async (req, res) => {
  try {
    let { pages, limit = 10, searchQuery } = req.query;
    pages = parseInt(pages);
    limit = parseInt(limit);

    console.log({ pages, limit, searchQuery });

    let filter = {};

    // Apply Search Query (Matches Name, City, or Country)
    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { city: { $regex: searchQuery, $options: "i" } },
        { country: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // Fetch data from MongoDB with Filters & Pagination
    const places = await Place.find(filter)
      .skip((pages - 1) * limit)
      .limit(limit);

    const totalPlaces = await Place.countDocuments(filter);
    const hasMore = pages * limit < totalPlaces; // Check if more data is available

    res.json({ places, hasMore });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get place by its _id
exports.getPlaceById = async (req, res) => {
  try {
    const placeId = req.query.id; // Get the _id from the URL parameter

    // Find the place by _id
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.json(place); // Send the place data in the response
  } catch (error) {
    console.error("Error fetching place by _id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get places by category
exports.getPlacesByCategory = async (req, res) => {
  const { category } = req.query; // Get category from request parameters

  try {
    const places = await Place.find({ category: category }).limit(5); // Find places with matching category
    if (!places || places.length === 0) {
      return res
        .status(404)
        .json({ message: "No places found for this category" });
    }
    res.status(200).json(places); // Send the places as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new place (Optional)
exports.addPlace = async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).json({place, message: "Place added successfully"});
  } catch (error) {
    console.log(error.errorResponse.errmsg);
    
    res.status(400).json({ error:error.errorResponse.errmsg || error.message || "Server error please try again." });
  }
};
