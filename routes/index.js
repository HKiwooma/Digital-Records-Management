const express = require("express"),
  router = express.Router(),
  routeControl = require("../controllers/authController");

// restrict index for logged in user only
router.get("/", routeControl.home);

// route to register page
router.get("/register", routeControl.register);

// route for register action
router.post("/register", routeControl.doRegister);

// route to login page
router.get("/login", routeControl.login);

// route for login action
router.post("/login", routeControl.doLogin);

// route for logout action
router.get("/logout", routeControl.logout);

module.exports = router;
