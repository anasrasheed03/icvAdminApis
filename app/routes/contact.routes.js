const controller = require("../controllers/contactus.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/public/contactUs",
        controller.contactUs
      );

      app.get(
        "/api/admin/contactUsList",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.ContactUsList
      );

      app.get(
        "/api/admin/contactUsStats",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.ContactUsStats
      );

      app.get(
        "/api/admin/contactUsGraph",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.ContactUsGraph
      );

      app.get(
        "/api/admin/contactUsEmailList",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.getContactEmails
      );
      
};