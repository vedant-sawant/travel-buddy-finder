const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken")
// const axios = require("axios");
const cors = require("cors");
require("dotenv").config();



const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => { res.json("socket.io running") });

const userMap = new Map();

io.on("connection", (socket) => {
  //   console.log(`User connected with socket ID: ${socket.id}`);

  socket.on("token", (token) => {
    const user_email = jwt.verify(token, "secret_key");
    
    console.log({user_email , token});
    userMap.set(user_email, socket.id);
    // console.log("User map:", Array.from(userMap.entries()));

    socket.emit("user_email", user_email);
  });

  socket.on("msg", (msg) => {
    const receiverID = userMap.get(msg.receiver);
    console.log(receiverID , "receiver id" , msg);

      console.log("User map:", Array.from(userMap.entries()));

  //   try{
  //       const response = await axios.post(`${process.env.SERVER_URL}/message`, {
  //     sender: msg.sender,
  //     receiver: msg.receiver,
  //     message: msg.msg,
  //   });
  //   console.log(response.data);
  //   }
  // catch(err){
  //   console.log({err});
  // }

    console.log({msg: msg});

    if (receiverID) {
      console.log("go in if");
      socket.to(receiverID).emit("msg", msg);
      console.log("message send");
    }

  
  });

  socket.on("disconnect", () => {
    // console.log(`Socket disconnected: ${socket.id}`);

    for (const [user_email, id] of userMap.entries()) {
      if (id === socket.id) {
        userMap.delete(user_email);
        break;
      }
    }
  });
});

server.listen(8081, () => {
  console.log("socket is connected");
})

