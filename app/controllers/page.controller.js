const db = require("../models");

const Page = db.page;
const PageSection = db.pageSection;
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


  exports.PageSectionById = (req, res) => {
      let pageSelectionList = []
    PageSection.find()
    .exec((err, pageSection) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        // console.log(pageSection)
        pageSection.forEach(element => {
            // console.log(element.pageId)
            // console.log(req.params.id)
            if(element.pageId == req.params.id){
                pageSelectionList.push(element)
            }
        });
        res.status(200).send(pageSelectionList)
        // .send({
        //     id: blog['_id'],
        //     title: blog.title,
        //     link: blog.link,
        //     coverImage: blog.coverImage,
        //     content: blog.content
        //   });
      }
    })
  };