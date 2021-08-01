const controller = require("../controllers/file.controller");
const { authJwt } = require("../middlewares");
module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/admin/saveFile",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.saveFile
      );
};