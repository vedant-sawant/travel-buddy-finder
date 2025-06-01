const express = require("express");
const {
  sign_up_user,
  sign_in_user,
  findUserByEmail,
  getAllUsers,
} = require("../controllers/users");

const router = express.Router();

exports.userRouter = router
  .post("/signup", sign_up_user)
  .post("/signin", sign_in_user)
  .get("/user", findUserByEmail)
  .get("/allusers", getAllUsers);
