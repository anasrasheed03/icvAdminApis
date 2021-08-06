const config = require("../config/auth.config");
const db = require("../models");
const Blog = db.blog;


exports.CreateBlog = (req, res) => {
    const blog = new Blog({
      title: req.body.title,
      link: req.body.link,
      coverImage: req.body.coverImage,
      content: req.body.content,
    });
  
    blog.save((err, blog) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Blog Created successfully!" });

    });
  };


  exports.BlogList = (req, res) => {
    let blogsList = [];
    Blog.find()
    .exec((err, blogs) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        blogs.forEach(element => {
            blogsList.push({title:element.title, link:element.content, id:element['_id']})
        });
        res.status(200).send(blogsList);
      }
    })
  };


  exports.BlogListPublic = (req, res) => {
    let blogsList = [];
    Blog.find()
    .exec((err, blogs) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        blogs.forEach(element => {
            blogsList.push({title:element.title, link:element.content, id:element['_id'], coverImage:element.coverImage})
        });
        res.status(200).send(blogsList);
      }
    })
  };


  exports.updateBlogById = (req, res) => {
    const filter = { _id:req.body.id };
    const update = { title:req.body.title, link:req.body.link, content:req.body.content, coverImage: req.body.coverImage};
      Blog.findOneAndUpdate(filter, update)
      .exec((err, blog) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }else{
          res.status(200).send({ message: "Blog updated successfully!" });
        }
      })
    };
  

  exports.BlogById = (req, res) => {
    // console.log(req.params.id)
    let blogData = [];
    const filter = { _id:req.params.id };    
    Blog.find()
    .exec((err, blog) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        blog.forEach(content => {
          if(content['_id'] == req.params.id){
          console.log(content)
            blogData = content;
          }
      });
        // if(blog['id']==req.params.id){
        //   blogData = blog
        // }
        res.status(200)
        .send(blogData);
      }
    })
  };