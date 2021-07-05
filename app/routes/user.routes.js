const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/admin/alluser", [authJwt.verifyToken,authJwt.isAdmin], controller.userBoard);

  app.post("/api/user/updatePassword", controller.UpdatePassword);
  app.post("/api/user/updateEmail", controller.updateEmail);

  app.post("/api/user/updateUser", controller.updateUserById);
  app.post("/api/user/disabledUser", controller.disabledUserById);
  app.post("/api/user/enableUser", controller.enabledUserById);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/user/rolesList",
    [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
    controller.UserTypeList
  );
  
};
