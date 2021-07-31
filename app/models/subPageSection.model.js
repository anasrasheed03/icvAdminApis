const mongoose = require("mongoose");
  
  const PageSubSections = mongoose.model(
    "PageSubSections",
    new mongoose.Schema({
      title: String,
      content: String,
      backgroundImage: String,
      date: String,
      pageId:mongoose.Schema.Types.ObjectId,
      sectionId:mongoose.Schema.Types.ObjectId,
    })
  );

  module.exports = PageSubSections;
