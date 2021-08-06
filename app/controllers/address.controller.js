const config = require("../config/auth.config");
const db = require("../models");
const Address = db.address;

exports.addAddress = (req, res) => {
    const addNewAddres = new Address({
        officeLocation: req.body.officeLocation,
        officeAddress: req.body.officeAddress,
        officeContact: req.body.officeContact,
        officeMail: req.body.officeMail,
        date: new Date().toISOString(),
    });

    addNewAddres.save((err, address) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "address is added successfully!" });

    });
};

exports.AddressList = (req, res) => {
    Address.find()
    .exec((err, addresess) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        res.status(200).send(addresess);
      }
    })
  };

  exports.updateAddress = (req, res) => {
    console.log(req.body)
    const filter = { _id:req.body.id };
    const update = { officeLocation:req.body.officeLocation, officeAddress:req.body.officeAddress, officeContact:req.body.officeContact, officeMail:req.body.officeMail};
    Address.findOneAndUpdate(filter, update)
      .exec((err, page) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }else{
          res.status(200).send({ message: "Address updated successfully!" });
        }
      })
    };