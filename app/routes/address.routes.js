const controller = require("../controllers/address.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/admin/addAddress",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.addAddress
      );

      app.get(
        "/api/admin/AddressList",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.AddressList
      );

      app.get(
        "/api/public/AddressList",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.AddressList
      );

      app.post(
        "/api/admin/updateAddress",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.updateAddress
      );
}