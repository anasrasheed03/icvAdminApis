const mongoose = require("mongoose");

const ContactUs = mongoose.model(
  "ContactUs",
  new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
  })
);

module.exports = ContactUs;
