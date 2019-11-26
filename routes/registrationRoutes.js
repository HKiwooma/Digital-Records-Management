const express = require("express");
const router = express.Router();
const registry = require("../models/registrationModel");

// Routes
//register page route.
router.get("/", (req, res, next) => {
  res.render("signUp");
});

// a document instance
router.post("/", async (req, res) => {
  const myRegister = new registry(req.body);
  // save data using scheme collection name 'Register' to database
  try {
    await myRegister.save();
    const items = await registry.find();
    req.send('Thank You for registering with us')
    // res.render("login", { users: items });
  } catch (error) {
    res.status(400).send("unable to save to database");
  }
});

module.exports = router;
