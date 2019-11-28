const express = require("express"),
router = express.Router(),
Registry = require("../models/registrationModel"),
passport = require("passport");
// Routes
//register page route..
router.get("/register", function(req, res) {
  res.render("signUp", {pageTitle: "Sign Up Page",
    path: "/register"
  });
});

router.post("/register", function(req, res) {
  const myRegister = new Registry(req.body);
  try {
    await myRegister.save();
    const items = await Registry.find();
    // res.send('thank you for registering with us');
    passport.authenticate("local"),(req, res, function() {
        // res.redirect("/");
    res.redirect("/login");})
  } catch (error) {
    console.log(error)
    res.status(400).send("unable to save to database");
    // res.render("/register", { Registry: Registry })
  }
  
router.get("/login", function(req, res) {
    res.render("login",
    {pageTitle: "Login Page"}, { user: req.user });
  });

  router.post("/login", passport.authenticate("local"), function(req, res) {
    // res.redirect("/");
    console.log("thank for logging in");
    res.send('thank you for registering with us')
  });
)
module.exports = router;
