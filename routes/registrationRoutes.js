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
<<<<<<< HEAD
    res.send('thank you for registering with us');
    //res.render("login", {users: items});
=======
    res.send('Thank You for registering with us')
    // res.render("login", { users: items });
>>>>>>> 5748e583cd220bbfc35c1ae19922df18a491220c
  } catch (error) {
    console.log(error)
    res.status(400).send("unable to save to database");
  }
});

module.exports = router;
