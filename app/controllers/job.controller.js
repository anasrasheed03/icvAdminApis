const config = require("../config/auth.config");
const db = require("../models");
const Jobs = db.jobs;

var moment = require('moment'); 

exports.CreateJob = (req, res) => {
    const job = new Jobs({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      totalOpenPosition: req.body.totalOpenPosition,
      content: req.body.content,  
      postedDate: new Date().toISOString(),
      workExp:req.body.workExp,
      country:req.body.country,
      state:req.body.state,
      city:req.body.city
    });
  
    job.save((err, job) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Job is added successfully!" });

    });
  };

  exports.JobList = (req, res) => {
    Jobs.find()
    .exec((err, jobs) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send(jobs);
      }
    })
  };