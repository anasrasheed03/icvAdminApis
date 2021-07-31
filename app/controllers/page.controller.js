const db = require("../models");

const Page = db.page;
const PageSection = db.pageSection;
const PageSubSection = db.pageSubSection;
exports.CreatePage = (req, res) => {
    const pages = new Page({
      name: req.body.name,
      link: req.body.link,
      date: new Date().toISOString(),
    });
  
    pages.save((err, page) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Page is Created successfully!" });
  
    });
  };

  exports.PageList = (req, res) => {
    let pagesList = [];
    Page.find()
    .exec((err, pages) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
          console.log(pages)
        pages.forEach(element => {
            pagesList.push({name:element.name, link:element.link, id: element['_id']})
        });
        res.status(200).send(pagesList);
      }
    })
  };


  exports.CreatePageSections = (req, res) => {
    const pages = new PageSection({
        title: req.body.title,
        content: req.body.content,
        backgroundImage: req.body.backgroundImage,
        pageId: req.body.pageId,
        date: new Date().toISOString(),
    });
  
    pages.save((err, page) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Page Section is Created successfully!" });
  
    });
  };


  exports.CreatePageSubSections = (req, res) => {
    const pages = new PageSubSection({
        title: req.body.title,
        content: req.body.content,
        backgroundImage: req.body.backgroundImage,
        pageId: req.body.pageId,
        sectionId:req.body.sectionId,
        date: new Date().toISOString(),
    });
  
    pages.save((err, subSection) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Page Sub Section is Created successfully!" });
  
    });
  };


  exports.PageSectionById = (req, res) => {
      let pageSelectionList = []
    PageSection.find().limit(10)
    .exec((err, pageSection) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        pageSection.forEach(element => {
            if(element.pageId == req.params.id){
                pageSelectionList.push(element)
            }
        });
        res.status(200).send(pageSelectionList)
      }
    })
  };

  exports.PageSubSectionById = (req, res) => {
    let pageSelectionList = []
  PageSubSection.find().limit(100)
  .exec((err, pageSection) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      console.log(req.params.id)
      pageSection.forEach(element => {
          if(element.sectionId == req.params.id){
              pageSelectionList.push(element)
          }
      });
      res.status(200).send(pageSelectionList)
    }
  })
};

  exports.PageSectionByIdAdmin = (req, res) => {
    let pageSelectionList = []
  PageSection.find().limit(10)
  .exec((err, pageSection) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      pageSection.forEach(element => {
          if(element.pageId == req.params.id){
              pageSelectionList.push({id:element['_id'],title:element.title, backgroundImage:element.backgroundImage})
          }
      });
      res.status(200).send(pageSelectionList)
    }
  })
};

exports.PageSectionDataById = (req, res) => {
  let pageSelectionList = []
PageSection.find().limit(10)
.exec((err, pageSection) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }else{
    pageSection.forEach(element => {
        if(element['_id'] == req.params.id){
            pageSelectionList.push({id:element['_id'],title:element.title,content:element.content})
        }
    });
    res.status(200).send(pageSelectionList)
  }
})
};

exports.updateSectionById = (req, res) => {
  const filter = { _id:req.body.id };
  const update = { title:req.body.title, content:req.body.content, backgroundImage: req.body.backgroundImage};
  PageSection.findOneAndUpdate(filter, update)
    .exec((err, section) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send({ message: "Page Section updated successfully!" });
      }
    })
  };