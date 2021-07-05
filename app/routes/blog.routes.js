const controller = require("../controllers/blog.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/admin/createBlog",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.CreateBlog
      );

      app.get(
        "/api/admin/blogList",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.BlogList
      );

      app.get(
        "/api/public/blogList",
        controller.BlogListPublic
      );

      app.post(
        "/api/public/getBlogById",
        controller.BlogById
      );

      app.post(
        "/api/admin/getBlogById",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.BlogById
      );

      app.post(
        "/api/admin/updateBlogById",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.updateBlogById
      );
      
};