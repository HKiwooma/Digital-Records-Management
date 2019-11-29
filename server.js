const express = require("express"),
  path = require("path"),
  logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

// main config
const app = express();
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("your secret here"));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

// view engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// body-parser to parse request body data
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: false }));

// passport config
const Registry = require("./models/registrationModel");
passport.use(new LocalStrategy(Registry.authenticate()));
passport.serializeUser(Registry.serializeUser());
passport.deserializeUser(Registry.deserializeUser());

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://localhost:27017/police-db",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
  )
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

// Importing Routes
require("./routes/registrationRoutes");
app.use("/", index);
app.use("/users", users);
// passport configuration
var User = require("./models/registrationModel");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
