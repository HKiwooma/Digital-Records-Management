const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "pug"); // Setting the view engine to pug
app.set("views", path.join(__dirname, "views")); // Setting the folder path

// body-parser to parse request body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importing Routes
// signUP route
const registrationRoute = require("./routes/registrationRoutes");
app.use("/register", registrationRoute);

// signUP route
const loginRoute = require("./routes/loginRoute");
app.use("/login", loginRoute);

/* connect to database */
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/police-db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);
// require("./models/registrationModel")

//how to start listening to the serve
app.listen(3000, () => {
  console.log("listening on 3000");
});
