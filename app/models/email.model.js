const mongoose = require("mongoose");

const Email = mongoose.model(
  "Email",
  new mongoose.Schema({
    from: String,
    content: String,
    title: String,
    to: String,
  })
);

module.exports = Email;
