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
// Define db routes
const registrationRoute = require("./routes/registrationRoutes");
app.use("/register", registrationRoute);

//connecting to the DB
mongoose.connect(
  "mongodb://localhost:27017/police-db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

//how to start listening to the serve
app.listen(3000, () => {
  console.log("listening on 3000");
});