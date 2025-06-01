const express = require("express");
const { getMessages, saveMessage } = require("../controllers/messages");

const messagesRouter = express.Router();

exports.messagesRouter = messagesRouter
  .get("/messages", getMessages)
  .post("/message", saveMessage);
