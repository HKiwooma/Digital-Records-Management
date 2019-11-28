const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  passportLocalMongoose = require("passport-local-mongoose");

// Schema defintion
const Registry = new Schema({
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

Registry.plugin(passportLocalMongoose);

module.exports = mongoose.model("Registry", Registry);
