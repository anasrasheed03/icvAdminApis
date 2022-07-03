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
    let pages;
    if(req['body']['pageId'] !== '610059328896b559189ad16b'){
    pages = new PageSection({
        title: req.body.title,
        content: req.body.content,
        backgroundImage: req.body.backgroundImage,
        pageId: req.body.pageId,
        date: new Date().toISOString(),
    });
  }else if(req['body']['pageId'] === '610059328896b559189ad16b'){
    pages = new PageSection({
      title: req.body.title,
      downloadLink: req.body.downloadLink,
      backgroundImage: req.body.backgroundImage,
      pageId: req.body.pageId,
      date: new Date().toISOString(),
  });
  }
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
        subTitle:req.body.subTitle,
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
            if(element.pageId != '610059328896b559189ad16b'){
              pageSelectionList.push({id:element['_id'],title:element.title,content:element.content,backgroundImage:element.backgroundImage})
            }else if(element.pageId == '610059328896b559189ad16b'){
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
  if(req['body']['pageId'] != '610059328896b559189ad16b'){
    console.log('if')
  update = { title:req.body.title, content:req.body.content, backgroundImage: req.body.backgroundImage};
  }else if(req['body']['pageId'] == '610059328896b559189ad16b'){
    update = { title:req.body.title, downloadLink:req.body.downloadLink, backgroundImage: req.body.backgroundImage};
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


  exports.updateSubSectionById = (req, res) => {
    const filter = { _id:req.body.id };
    let update;
    if(req['body']['pageId'] === '610057948896b559189ad14f' && req['body']['sectionId'] === '6105ceb9a7f58e5a2014063c'){
      update = { title:req.body.title, content:req.body.content, backgroundImage: req.body.backgroundImage, company: req.body.company};
    } else if(req['body']['pageId'] === '610057948896b559189ad14f' && req['body']['sectionId'] === '6105ce82a7f58e5a20140634'){
      update = { title:req.body.title, content:req.body.content};
    }else if(req['body']['pageId'] === '610057948896b559189ad14f' && req['body']['sectionId'] === '6105ce8aa7f58e5a20140636'){
      update = { title:req.body.title, content:req.body.content};
    }else if(req['body']['pageId'] === '610057948896b559189ad14f' && req['body']['sectionId'] === '6105ce98a7f58e5a20140638'){
      update = { title:req.body.title, backgroundImage: req.body.backgroundImage, icon: req.body.icon};
    }else if(req['body']['pageId'] === '610057948896b559189ad14f' && req['body']['sectionId'] === '6105cec9a7f58e5a2014063e'){
      update = { title:req.body.title, content:req.body.content};
    }else if(req['body']['pageId'] === '610057948896b559189ad14f' && req['body']['sectionId'] === '6105ce9fa7f58e5a2014063a'){
      update = { title:req.body.title, content:req.body.content, backgroundImage:req.body.backgroundImage};
    }else if(req['body']['pageId'] === '610057948896b559189ad14f' && req['body']['sectionId'] === '6105ce7ca7f58e5a20140632'){
      update = { title:req.body.title, content:req.body.content, backgroundImage:req.body.backgroundImage, subTitle:req.body.subTitle};
    }
    PageSubSection.findOneAndUpdate(filter, update)
      .exec((err, section) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }else{
          res.status(200).send({ message: "Page Sub Section updated successfully!" });
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