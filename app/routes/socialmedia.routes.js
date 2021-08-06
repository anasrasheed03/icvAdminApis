const controller = require("../controllers/socialmedia.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/admin/addSocialMedia",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.addSocialMedia
      );

      app.get(
        "/api/admin/SocialMediaList",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.SocialMediaList
      );

      app.get(
        "/api/public/SocialMediaList",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.SocialMediaList
      );
}