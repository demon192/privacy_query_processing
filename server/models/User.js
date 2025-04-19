const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  pseudonym: String,
  age: Number,
  gender: String,
  location: String,
});

module.exports = mongoose.model("User", userSchema);
