const mongoose = require("mongoose");
  
  const PageSections = mongoose.model(
    "PageSections",
    new mongoose.Schema({
      title: String,
      content: String,
      backgroundImage: String,
      date: String,
      pageId:mongoose.Schema.Types.ObjectId
    })
  );

  module.exports = PageSections;
