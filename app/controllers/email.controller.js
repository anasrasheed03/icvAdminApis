const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require("nodemailer");
const Email = db.email;


exports.SendEmail = (req, res) => {
  const email = new Email({
      to: req.body.to,
      from: 'info@icvglobal.com',
      title: req.body.title,
      content: req.body.content,
    });
  
    email.save((err, email) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else{
        sendEmail(req.body);
        res.send({ message: "Emails sent successfully!" });


      }

    });
  };

  async function sendEmail(data) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      name: 'icvglobal.com',
      host: "mail.icvglobal.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'info@icvglobal.com', // generated ethereal user
        pass: 'P@ssw0rd', // generated ethereal password
      },
      tls: { 
        rejectUnauthorized: false 
    }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo" <info@icvglobal.com>', // sender address
      to: data.to, // list of receivers
      subject: data.title, // Subject line
      text: data.content, // plain text body
      html: data.content, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }


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