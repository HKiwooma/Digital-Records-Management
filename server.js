const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

// main config
const app = express();
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("your secret here"));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// body-parser to parse request body data
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

// passport config
const Registry = require("./models/registrationModel");
passport.use(new LocalStrategy(Registry.authenticate()));
passport.serializeUser(Registry.serializeUser());
passport.deserializeUser(Registry.deserializeUser());

mongoose.connect(
  "mongodb://localhost:27017/police-db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

// Importing Routes
require("./routes/registrationRoutes");

//how to start listening to the serve
app.listen(3000, () => {
  console.log("listening on 3000");
});
