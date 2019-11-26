const mongoose = require("mongoose");

// Schema defintion
const registrationSchema = new mongoose.Schema({
  
  userName: {
    type: String,
    required: [true, "Please Enter User name"]
  },
  
  password: {
    type: String,
    required: [true, "Please Enter password"]
  }
});

module.exports = mongoose.model("registryModel", registrationSchema);