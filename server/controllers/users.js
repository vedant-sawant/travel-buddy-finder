const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { User } = require("../model/users");

//
// for creating new user sign up
exports.sign_up_user = async (req, res) => {
  var otp = Math.floor(100000 + Math.random() * 1000000);
  console.log(otp, req.body);

  if (req.body.formData.user_email === process.env.ADMIN_EMAIL) {
  return  res.json({ err_msg: "Email or Adhaar_card_no are already exists" });
  }

  if (!req.body.formData.user_otp) {
    try {
      const {
        user_name,
        user_email,
        user_password,
        user_adhaar_no,
        user_city,
        user_state,
        user_gender,
        user_preferances,
      } = req.body.formData;
      // console.log(req.body.formData);

      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(user_password, salt);

      const user_details = {
        user_name,
        user_email,
        user_password: hashed_password,
        user_adhaar_no,
        user_gender,
        user_city,
        user_state,
        user_preferances,
        user_otp: otp,
      };

      const user = new User(user_details);
      const new_user = await user.save();

      res
        .status(201)
        .json({ user: new_user, otp_msg: "OTP send on your email." });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: new_user.user_email,
        subject: "To send OTP",
        text: `Your OTP is ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      });

      // console.log(user);
      //
    } catch (err) {
      // console.log(err);
      res.json({ err_msg: "Email or Adhaar_card_no are already exists" });
    }
  } else {
    try {
      const otp_to_check = +req.body.formData.user_otp;
      console.log("hello", otp_to_check, req.body.formData.user_email);

      const user_email = req.body.formData.user_email;
      const user = await User.findOne({ user_email: user_email });
      console.log({ user });

      const stored_otp = user.user_otp;

      console.log(otp_to_check, stored_otp);

      res.status(201).json(+otp_to_check === +stored_otp);
    } catch (err) {
      res.json(err);
    }
  }
};

// for signinning the user

exports.sign_in_user = async (req, res) => {
  try {
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

    const { user_email, user_password } = req.body.loginData;

    console.log(user_email,user_password);
    if(user_email === process.env.ADMIN_EMAIL && user_password === process.env.ADMIN_PASSWORD){

      return  res.json({msg:"Admin login successfully",user:adminData,token:process.env.ADMIN_TOKEN});
    }

    const user = await User.findOne({ user_email: user_email });

    if (user) {
      const isVerify = await bcrypt.compare(user_password, user.user_password);

      if (isVerify) {
        const token = jwt.sign(user_email, "secret_key");

        res.json({ token: token, msg: "Sign in successfully", user: user });
      } else {
        res.status(404).json("Password is wrong");
      }
    } else {
      res.status(404).json("Email is wrong");
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ err_msg: "User not found" });
  }
};

exports.findUserByEmail = async (req, res) => {
  try {
    console.log(req.query);
    const { user_email } = req.query;

    const user_details = await User.findOne({ user_email: user_email });

    res.status(200).json(user_details);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {

    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ msg: "You are not authenticated" });
    }
    if (token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ msg: "You are not authenticated" });
    }


    const users = await User.find();
    res.status(200).json({data:users,success:true});
  } catch (err) {
    res.status(400).json({error:err,success:false});
  }
}