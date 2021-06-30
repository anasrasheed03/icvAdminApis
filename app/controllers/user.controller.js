const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  User.find()
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send(user);
    }
  })
};


exports.UpdatePassword = (req, res) => {
const filter = { email: req.body.email };
const update = { password:bcrypt.hashSync(req.body.password, 8)};
  User.findOneAndUpdate(filter, update)
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send({ message: "password updated successfully!" });
    }
  })
};

exports.updateEmail = (req, res) => {
  const filter = { email: req.body.oldEmail };
  const update = { email:req.body.newEmail};
    User.findOneAndUpdate(filter, update)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send({ message: "Email updated successfully!" });
      }
    })
  };

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
