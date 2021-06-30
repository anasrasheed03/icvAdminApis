const mongoose = require("mongoose");

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema({
    title: String,
    link: String,
    coverImage: String,
    content: String,
  })
);

module.exports = Blog;
