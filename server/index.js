const express = require("express");
const cors = require("cors");
const path = require("path");
const { mongooseConnection } = require("./database/db");
const { placesRouter } = require("./routes/places");
const { tripRouter } = require("./routes/trip");
const { messagesRouter } = require("./routes/messages");
const { userRouter } = require("./routes/users");
const { userAuthentication } = require("./auth/auth");
const { requestRouter } = require("./routes/requestMessage");
const { Place } = require("./model/places");
const { feedbackRouter } = require("./routes/userFeedback");
require("dotenv").config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(express.static(path.resolve(__dirname, "public", "dist")));

//
// routers
server.get("/auth", userAuthentication);

server.use(placesRouter);
server.use(tripRouter);
server.use(messagesRouter);
server.use(userRouter);
server.use(requestRouter);
server.use(feedbackRouter);

server.get("/*", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
  } catch (err) {
    console.log(err);
  }
});

// databse connectivity

mongooseConnection();

//
//
//
//
//
// code for the inserting the many places in the places collection

async function addPlaces(places) {
  try {
    //
    //
    //
    const res = await Place.insertMany(places, { ordered: false });

    // Log inserted document IDs
    console.log(
      "Successfully inserted IDs:",
      res.map((doc) => doc._id)
    );
    //
    //
    //

    // for the count

    // const count = await Place.countDocuments();
    // console.log(`Total Historical Places: ${count}`);
    //
    //
    //
  } catch (err) {
    console.error("Some documents failed to insert.");
    if (err.writeErrors) {
      console.error(
        "Failed Documents:",
        err.writeErrors.map((error) => ({
          index: error.index,
          reason: error.errmsg,
        }))
      );
    } else {
      console.error("Error Details:", err);
    }
  }
}

// addPlaces();

//
//
//
//
//
//
//

//

// server is listning
server.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    return console.log({ err });
  }
  console.log(`server is running... ${process.env.PORT}`);
});
