const mongoose = require("mongoose");

const Resume = mongoose.model(
  "Resume",
  new mongoose.Schema({
    address: String,
    addressCity: String,
    addressCountry: String,
    addressPostalCode: String,
    email: String,
    firstName: String,
    lastName:String,
    linkedin:String,
    notes:String,
    phoneNumber:String,
    resumeLink:String,
    date:String
  })
);

module.exports = Resume;
