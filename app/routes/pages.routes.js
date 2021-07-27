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
    [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.CreatePageSections
  );

  
app.get(
    "/api/public/pageList",
    controller.PageList
  );

  app.get(
    "/api/public/pageSectionList/:id",
    controller.PageSectionById
  );

};