const express = require("express"),
  router = express.Router(),
  Registry = require("../models/registrationModel"),
  passport = require("passport");

// Routes
//register page route.
router.get("/", (req, res, next) => {
  res.render("login",{
    pageTitle: "Login Page",
    path: "/register"
  },
   { user : req.user })
});

router.post("/", passport.authenticate("local"), function(req, res) {
  console.log("thank for logging in");
  res.redirect("/register");
});

module.exports = router;
