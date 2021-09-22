const config = require("../config/auth.config");
const db = require("../models");
const Resume = db.resume;

var moment = require('moment'); 

exports.SubmitResume = (req, res) => {
    const job = new Resume({
      address: req.body.address,
      addressCity: req.body.addressCity,
      addressCountry: req.body.addressCountry,
      addressPostalCode: req.body.addressPostalCode,
      email: req.body.email,  
      date: new Date().toISOString(),
      lastName:req.body.lastName,
      linkedin:req.body.linkedin,
      notes:req.body.notes,
      phoneNumber:req.body.phoneNumber,
      resumeLink:req.body.resume,
      jobId:req.body.jobId,
    });
  
    job.save((err, job) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Resume is submitted successfully!" });

    });
  };

  exports.ResumeList = (req, res) => {
    Resume.find()
    .exec((err, resume) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send(resume);
      }
    })
  };