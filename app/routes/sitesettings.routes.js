const controller = require("../controllers/siteSetting.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/admin/addSettings",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.AddSiteSetting
      );

      app.get(
        "/api/admin/siteSettingList",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.GetSiteSettingData
      );

      app.get(
        "/api/public/siteSettingList",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.GetSiteSettingData
      );

      app.post(
        "/api/admin/updateSiteSettings",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.UpdateSettings
      );
}