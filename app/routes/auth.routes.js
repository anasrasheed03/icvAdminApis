const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmailorPhoneNumber,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  

  app.post(
    "/api/auth/addModerator",
    [
      verifySignUp.checkDuplicateUsernameOrEmailorPhoneNumber,
      verifySignUp.checkRolesExisted,
    ],
    controller.addModerator
  );

  app.post(
    "/api/auth/addAdmin",
    [
      verifySignUp.checkDuplicateUsernameOrEmailorPhoneNumber,
      verifySignUp.checkRolesExisted,
    ],
    controller.addAdmin
  );

  app.post("/api/auth/signin", controller.signin);
};
