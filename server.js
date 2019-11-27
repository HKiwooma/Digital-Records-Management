const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport"), LocalStrategy = require("passport-local").Strategy;

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
//middleware for authetication
passport.use(
  new LocalStrategy(function(officerID, password, done) {
    User.findOne({ officerID: officerID }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect officerID." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

//how to start listening to the serve
app.listen(3000, () => {
  console.log("listening on 3000");
});
