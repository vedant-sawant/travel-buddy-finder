const express = require("express");
const {
  getPlaces,
  addPlace,
  getPlaceById,
  getPlacesByCategory,
} = require("../controllers/places");

const router = express.Router();

exports.placesRouter = router
  .get("/get/places", getPlaces)
  .get("/get/place/id", getPlaceById)
  .get("/get/places/category", getPlacesByCategory)
  .post("/add/place", addPlace);
