const mongoose = require("mongoose");

const Jobs = mongoose.model(
  "Jobs",
  new mongoose.Schema({
    title: String,
    startDate: String,
    endDate: String,
    totalOpenPosition: String,
    content: String,
    postedDate: String,
    workExp:String,
    country:String,
    state:String,
    city:String
  })
);

module.exports = Jobs;
