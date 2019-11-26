const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "pug"); // Setting the view engine to pug
app.set("views", path.join(__dirname, "views")); // Setting the folder path
app.use(express.static(path.join(__dirname, "public")));

// body-parser to parse request body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importing Routes
// Define db routes
const registrationRoute = require("./routes/registrationRoutes");

require("./models/Photo");
const index = require("./routes/index");
const users = require("./routes/users");

const loginRoute = require("./routes/loginRoute");

app.use("/register", registrationRoute);
app.use("/", index);
app.use("/users", users);
app.use("/login", loginRoute);

//connecting to the DB
mongoose.connect(
  "mongodb://localhost:27017/node-demo",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

//how to start listening to the serve
app.listen(3000, () => {
  console.log("listening on 3000");
});