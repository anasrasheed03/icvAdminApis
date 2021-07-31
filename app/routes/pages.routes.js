const controller = require("../controllers/page.controller");
const { authJwt } = require("../middlewares");
module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

app.post(
    "/api/admin/createPage",
    [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.CreatePage
  );

  app.post(
    "/api/admin/createPageSection",
    // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.CreatePageSections
  );

  app.post(
    "/api/admin/createPageSubSection",
    // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.CreatePageSubSections
  );
  
app.get(
    "/api/public/pageList",
    controller.PageList
  );

  app.get(
    "/api/admin/pageList",
    // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.PageList
  );

  app.get(
    "/api/public/pageSectionList/:id",
    controller.PageSectionById
  );

  app.get(
    "/api/admin/pageSectionList/:id",
    // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.PageSectionByIdAdmin
  );

  app.get(
    "/api/public/pageSubSectionList/:id",
    // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.PageSubSectionById
  );

  app.post(
    "/api/admin/updateSectionById",
    // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.updateSectionById
  );

  app.get(
    "/api/admin/getPageSectionDataById/:id",
    // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.PageSectionDataById
  );

};