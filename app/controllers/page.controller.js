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
        pages.forEach(element => {
            pagesList.push({name:element.name, link:element.link, id: element['_id']})
        });
        res.status(200).send(pagesList);
      }
    })
  };

  exports.PageBanner = (req, res) => {
    // let pagesList = [];
    Page.findOne({_id:req.params.id})
    .exec((err, page) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        // pages.forEach(element => {
        //     pagesList.push({name:element.name, link:element.link, id: element['_id']})
        // });
        res.status(200).send(page);
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
    PageSection.find().limit(100)
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
  PageSection.find().limit(100)
  .exec((err, pageSection) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      pageSection.forEach(element => {
          if(element.pageId == req.params.id){
              pageSelectionList.push({id:element['_id'],title:element.title})
          }
      });
      res.status(200).send(pageSelectionList)
    }
  })
};

exports.PageSectionDataById = (req, res) => {
  let pageSelectionList = []
PageSection.find().limit(100)
.exec((err, pageSection) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }else{
    pageSection.forEach(element => {
        if(element['_id'] == req.params.id){
            if(element.pageId !== '610059328896b559189ad16b'){
              pageSelectionList.push({id:element['_id'],title:element.title,content:element.content,backgroundImage:element.backgroundImage})
            }else if(element.pageId === '610059328896b559189ad16b'){
              pageSelectionList.push({id:element['_id'],title:element.title,backgroundImage:element.backgroundImage,downloadLink:element.downloadLink})

            }
        }
    });
    res.status(200).send(pageSelectionList)
  }
})
};

exports.updateSectionById = (req, res) => {
  const filter = { _id:req.body.id };
  let update;
  if(req['body']['pageId'] !== '610059328896b559189ad16b'){
  update = { title:req.body.title, content:req.body.content, backgroundImage: req.body.backgroundImage};
  }else if(req['body']['pageId'] === '610059328896b559189ad16b'){
    update = { title:req.body.title, downloadFile:req.body.downloadFile, backgroundImage: req.body.backgroundImage};
  }
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

  exports.updateBanner = (req, res) => {
    console.log(req.body)
    const filter = { _id:req.body.id };
    const update = { bannerImage:req.body.bannerImage, name:req.body.name, link:req.body.link};
    Page.findOneAndUpdate(filter, update)
      .exec((err, page) => {
        console.log(page)
        if (err) {
          res.status(500).send({ message: err });
          return;
        }else{
          res.status(200).send({ message: "Banner Image updated successfully!" });
        }
      })
    };