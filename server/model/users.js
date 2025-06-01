const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
  user_name: { type: String, require: true },
  user_email: { type: String, require: true, unique: true },
  user_password: { type: String, require: true },
  user_adhaar_no: { type: String, require: true, unique: true },
  user_gender: { type: String, require: true },
  user_city: { type: String, require: true },
  user_state: { type: String, require: true },
  user_otp: { type: Number, require: true, default: "000000" },
  user_location: {
    type: { lat: { type: Number }, lon: { type: Number } },
    require: true,
    default: { lat: 18.51, lon: 73.85 },
  },
  user_preferances: [String],
});

exports.User = mongoose.model("user", userSchema);
