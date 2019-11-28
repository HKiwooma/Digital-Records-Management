const express = require("express");
const router = express.Router();
const Registry = require("../models/registrationModel");

// Routes
//register page route.
router.get("/", (req, res, next) => {
  res.render("signUp", {
    pageTitle: "Sign Up",
    path: "/register"
  });
});

// a document instance
router.post("/", async (req, res) => {
  const myRegister = new Registry(req.body);
  // save data using scheme collection name 'Register' to database
  try {
    await myRegister.save();
    const items = await Registry.find();
    // res.send('thank you for registering with us');
    res.redirect("/login");
    // res.render("login", {users: items});
  } catch (error) {
    console.log(error)
    res.status(400).send("unable to save to database");
  }
});

module.exports = router;

/* // /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
}); */