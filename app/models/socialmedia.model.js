const mongoose = require("mongoose");

const SocialMedia = mongoose.model(
  "SocialMediaProfiles",
  new mongoose.Schema({
    link: String,
    name: String,
    date: String
  })
);

module.exports = SocialMedia;
