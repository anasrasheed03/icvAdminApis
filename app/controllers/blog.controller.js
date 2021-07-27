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
    Blog.findOne({_id:req.params.id})
    .exec((err, blog) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
<<<<<<< HEAD
        res.status(200).send({
=======
        console.log(blog['_id'])
        res.status(200)
        .send({
>>>>>>> faac13035a0878f07f2d27636c6cbdef038ef2e7
            id: blog['_id'],
            title: blog.title,
            link: blog.link,
            coverImage: blog.coverImage,
            content: blog.content
          });
      }
    })
  };