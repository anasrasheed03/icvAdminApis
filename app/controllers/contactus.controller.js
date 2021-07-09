const config = require("../config/auth.config");
const db = require("../models");
const ContactUs = db.contactus;
var moment = require('moment'); 

exports.contactUs = (req, res) => {
    const contactus = new ContactUs({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,  
      date: new Date().toISOString(),
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


  exports.ContactUsStats = (req, res) => {
    let today = 0;
    let previous = 0;
    ContactUs.find()
    .exec((err, contactus) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        contactus.forEach(element => {
          console.log(moment(element.date).month())
          if(moment(new Date()).format('YYYY-MM-DD') == moment(element.date).format('YYYY-MM-DD')){
            today++;
          }else{
            previous++;
          }
        });
        res.status(200).send({currentDay:today, previousDays: previous});
      }
    })
  };

  exports.ContactUsGraph = (req, res) => {
    let count = [
      0,0,0,0,0,0,0,0,0,0,0,0
    ]
    ContactUs.find()
    .exec((err, contactus) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        contactus.forEach(element => {
          console.log(moment(element.date).month())
          if(moment(element.date).month()){
            count[moment(element.date).month()]=count[moment(element.date).month()]+1
          }
        });
        res.status(200).send(count);
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