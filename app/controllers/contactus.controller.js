const config = require("../config/auth.config");
const db = require("../models");
const ContactUs = db.contactus;


exports.contactUs = (req, res) => {
    const contactus = new ContactUs({
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      subject: req.body.subject,
      message: req.body.message,  
    });
  
    contactus.save((err, contactus) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "contact us is added successfully!" });

    });
  };

  exports.ContactUsList = (req, res) => {
    ContactUs.find()
    .exec((err, contactus) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send(contactus);
      }
    })
  };


  exports.getContactEmails = (req, res) => {
    let emailsList = [];
    ContactUs.find()
    .exec((err, contactus) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        contactus.forEach(element => {
            emailsList.push({label:element.email, value:element.email})
        });
        res.status(200).send(emailsList);
      }
    })
  };