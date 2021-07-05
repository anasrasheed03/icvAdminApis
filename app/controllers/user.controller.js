const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const mongodb = require('mongodb');



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

exports.disabledUserById = (req, res) => {
  const filter = { _id:req.body.id };
  const update = { isActive:0};
    User.findOneAndUpdate(filter, update)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send({ message: "User updated successfully!" });
      }
    })
  };

  exports.enabledUserById = (req, res) => {
    const filter = { _id:req.body.id };
    const update = { isActive:1};
      User.findOneAndUpdate(filter, update)
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }else{
          res.status(200).send({ message: "User updated successfully!" });
        }
      })
    };

  exports.updateUserById = (req, res) => {

    
    const filter = { _id:req.body.id };
    const update = { isActive:1, username:req.body.username, email:req.body.email, password:bcrypt.hashSync(req.body.password, 8), firstname:req.body.firstname, lastname:req.body.lastname, age:req.body.age, gender:req.body.gender, phoneNumber:req.body.phoneNumber,roles: [new mongodb.ObjectID(req.body.roleId)]};
      User.findOneAndUpdate(filter, update)
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }else{
          res.status(200).send({ message: "User updated successfully!" });
        }
      })
    }; 

exports.UserTypeList = (req, res) => {
  let rolesList = [];
  Role.find()
  .exec((err, roles) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      roles.forEach(element => {
        rolesList.push({label:element.name, value:element['_id']})
      });
      res.status(200).send(rolesList);
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
