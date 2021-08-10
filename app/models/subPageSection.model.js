const mongoose = require("mongoose");
  
  const PageSubSections = mongoose.model(
    "PageSubSections",
    new mongoose.Schema({
      title: String,
      content: String,
      backgroundImage: String,
      company: String,
      icon: String,
      button1Link: String,
      button1Text: String,
      button2Link: String,
      button2Text: String,
      date: String,
      pageId:mongoose.Schema.Types.ObjectId,
      sectionId: mongoose.Schema.Types.ObjectId
    })
  );

  module.exports = PageSubSections;
