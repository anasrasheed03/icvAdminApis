const mongoose = require("mongoose");

const SiteSetting = mongoose.model(
  "SiteSetting",
  new mongoose.Schema({
    headerLogo: String,
    footerLogo: String,
    supportEmail: String,
    supportNumber: String,
    tagline:String,
    subscribeTagLine:String,
    date: String
  })
);

module.exports = SiteSetting;
