const mongoose = require("mongoose");


const CreatePage = mongoose.model(
    "Page",
    new mongoose.Schema({
      name: String,
      link: String,
      date: String,

    })
  );

//   const PageSections = mongoose.model(
//     "PageSections",
//     new mongoose.Schema({
//       title: String,
//       content: String,
//       backgroundImage: String,
//       date: String,
//       pageId:mongoose.Schema.Types.ObjectId
//     })
//   );
  
  module.exports = CreatePage;
  