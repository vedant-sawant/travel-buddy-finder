const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  bestSeasonToVisit: { type: String },
  averageTemperatureRange: { type: String },
  rainfallClimateConsiderations: { type: String },
  topAttractionsNearby: [{ type: String }], // Array of attractions
  activitiesExperiences: [{ type: String }], // Array of activities
  famousDishes: [{ type: String }], // Array of dishes
  safetyTravelTips: { type: String },
  estimatedDailyBudget: { type: String },
  activityPricing: { type: String },
  detailedDescription: { type: String },
  latitudeLongitude: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  howToTravelThere: {
    byRoad: { type: String },
    byAir: { type: String },
    byTrain: { type: String },
    byWater: { type: String },
  },
});

exports.Place = mongoose.model("Place", placeSchema);
