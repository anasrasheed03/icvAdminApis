const config = require("../config/auth.config");
const db = require("../models");
const Email = db.email;


exports.SendEmail = (req, res) => {
    const email = new Email({
      to: req.body.to,
      from: req.body.from,
      title: req.body.title,
      content: req.body.content,
    });
  
    email.save((err, email) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Emails sent successfully!" });

    });
  };


  exports.EmailTemplateList = (req, res) => {
    let emailsList = [];
    Email.find()
    .exec((err, email) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        email.forEach(element => {
            emailsList.push({title:element.title, content:element.content})
        });
        res.status(200).send(emailsList);
      }
    })
  };