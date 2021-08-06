const config = require("../config/auth.config");
const db = require("../models");
const Social = db.socialMedia;

exports.addSocialMedia = (req, res) => {
  const addNewSocialMedia = new Social({
    link: req.body.link,
    name: req.body.name,
    date: new Date().toISOString(),
  });

  addNewSocialMedia.save((err, socialmedia) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Social Media is added successfully!" });

  });
};

exports.SocialMediaList = (req, res) => {
  Social.find()
    .exec((err, medias) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send(medias);
      }
    })
};