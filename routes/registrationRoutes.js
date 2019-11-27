const express = require("express");
const router = express.Router();
const Registry = require("../models/registrationModel");

// Routes
//register page route.
router.get("/", (req, res, next) => {
  res.render("signUp");
});

// a document instance
router.post("/", async (req, res) => {
  const myRegister = new Registry(req.body);
  // save data using scheme collection name 'Register' to database
  try {
    await myRegister.save();
    const items = await Registry.find();
    // res.send('thank you for registering with us');
    res.render("login");
    // res.render("login", {users: items});
  } catch (error) {
    console.log(error)
    res.status(400).send("unable to save to database");
  }
});

module.exports = router;
