const mongoose = require("mongoose");

// Schema defintion
const registrationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please Enter User name"]
  },
  officerID: {
    type: String,
    required: [true, "Please Enter Officer ID"]
  },
  gender: String,
  ranks: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: [true, "Please Enter password"]
  }
});

module.exports = mongoose.model("Registries", registrationSchema);
