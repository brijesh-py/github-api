const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  github_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
