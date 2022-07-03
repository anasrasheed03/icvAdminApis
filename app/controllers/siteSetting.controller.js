const config = require("../config/auth.config");
const db = require("../models");
const SiteSetting = db.siteSetting;

exports.AddSiteSetting = (req, res) => {
  const addSettings = new SiteSetting({
    headerLogo: req.body.headerLogo,
    footerLogo: req.body.footerLogo,
    supportEmail: req.body.supportEmail,
    supportNumber: req.body.supportNumber,
    subscribeTagLine: req.body.subscribeTagLine,
    tagline: req.body.tagline,
    date: new Date().toISOString(),
  });

  addSettings.save((err, settings) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Site Setting is added successfully!" });

  });
};

exports.GetSiteSettingData = (req, res) => {
  SiteSetting.find()
    .exec((err, settings) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send(settings[0]);
      }
    })
};

exports.UpdateSettings = (req, res) => {
  const filter = { _id:req.body.id };
  const update = { headerLogo:req.body.headerLogo, footerLogo:req.body.footerLogo, supportEmail:req.body.supportEmail, supportNumber:req.body.supportNumber,subscribeTagLine:req.body.subscribeTagLine,tagline:req.body.tagline};
  SiteSetting.findOneAndUpdate(filter, update)
    .exec((err, page) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send({ message: "Site Setting updated successfully!" });
      }
    })
  };