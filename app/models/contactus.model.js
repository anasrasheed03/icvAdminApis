const mongoose = require("mongoose");

const ContactUs = mongoose.model(
  "ContactUs",
  new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    date: String
  })
);

module.exports = ContactUs;
