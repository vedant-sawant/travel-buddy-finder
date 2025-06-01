const jwt = require("jsonwebtoken");
const { User } = require("../model/users");

exports.userAuthentication = async (req, res, next) => {

  const adminData =  {
    "user_name": "Travel Buddy",
    "user_email": process.env.ADMIN_EMAIL,
    "user_adhaar_no": "",
    "user_gender": "Male",
    "user_city": "Pune",
    "user_state": "Maharashtra",
    "user_otp": 0,
    "user_location": {
      "lat": 18.5204,
      "lon": 73.8567
    },
    "user_preferances": [
      "Beach",
      "Historical",
      "Mountain",
      "Adventure",
      "Cultural",
    ],
    role: "admin"
  }


  try {
    const token = req.headers["authorization"].split(" ")[1];

    console.log({ token });
    if (token) {

      if (token === process.env.ADMIN_TOKEN) {
      res.status(200).json(adminData);
      next();
      return;
      }



      const isVerify = jwt.verify(token, "secret_key");
      console.log({ isVerify });

      if (isVerify) {
        const user = await User.findOne({ user_email: isVerify }).select(
          "-user_password"
        );
        console.log({ user });

        if (user) {
          res.status(200).json(user);
          next();
        } else {
          res.status(404).json("not found");
        }
      }
    } else {
      res.status(404).json("not found");
    }
  } catch (err) {
    res.status(500).json("Server Error");
    console.log(err);
  }
};
