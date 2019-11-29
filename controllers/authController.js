const mongoose = require("mongoose"),
  passport = require("passport"),
  User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render("index", { user: req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render("register");
};

// Post registration
userController.doRegister = function(req, res) {
  /* const myRegister = new Registry(req.body);
  try {
    await myRegister.save();
    const items = await Registry.find();
    // res.send('thank you for registering with us');
    passport.authenticate("local"), (req, res, function () {
      // res.redirect("/");
      res.redirect("/login");
    })
  } catch (error) {
    console.log(error)
    res.status(400).send("unable to save to database");
    // res.render("/register", { Registry: Registry })
  } */

  User.register(
    new User({ officerID: req.body.officerID, name: req.body.name }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.render("register", { user: user });
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      });
    }
  );
};

// Go to login page
userController.login = function(req, res) {
  res.render("login");
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate("local")(req, res, function() {
    res.redirect("/");
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

module.exports = userController;
