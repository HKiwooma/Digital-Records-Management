const express = require("express");
const router = express.Router();
// const registrationPost = require("../models/registrationModel");

//gets and displays a register page
router.get('/', (req, res) => {
    res.render('login')
})

// submits a login page information
router.post('/', async (req, res) => {
    try {
        //authenticate method compares 
        const user = await Register.authenticate(req.body.officerId, req.body.password);

        res.redirect('start')
    } catch{
        res.render('start', { error: "Failed to login, please try again" })

    }
})



module.exports = router;

