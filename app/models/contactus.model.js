const mongoose = require("mongoose");

const ContactUs = mongoose.model(
  "ContactUs",
  new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    subject: String,
    message: String,
  })
);

module.exports = ContactUs;
