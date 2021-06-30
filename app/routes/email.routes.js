const controller = require("../controllers/email.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/admin/sendEmail",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.SendEmail
      );

      app.get(
        "/api/admin/emailTemplateList",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.EmailTemplateList
      );
      
};