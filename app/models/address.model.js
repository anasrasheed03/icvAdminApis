const mongoose = require("mongoose");

const Address = mongoose.model(
  "Address",
  new mongoose.Schema({
    officeLocation: String,
    officeAddress: String,
    officeContact: String,
    officeMail: String,
    date: String
  })
);

module.exports = Address;
