const express = require("express");
const router = express.Router();
const Registry = require("../models/registrationModel");

// Routes
//register page route.
router.get("/", (req, res, next) => {
    res.render("login");
});

// a document instance
router.post("/", async (req, res) => {
    const myRegister = new Registry(req.body);
    // save data using scheme collection name 'Register' to database
    try {
        await myRegister.save();
        const items = await Registry.find();
        res.send("you have logged in");
        //res.render("", {users: items});
    } catch (error) {
        console.log(error)
        res.status(400).send("unable to save to database");
    }
});

module.exports = router;

