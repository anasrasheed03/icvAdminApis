const mongoose = require("mongoose");

const Subscriptions = mongoose.model(
  "Subscriptions",
  new mongoose.Schema({
    email: String,
    date: String
  })
);

module.exports = Subscriptions;
