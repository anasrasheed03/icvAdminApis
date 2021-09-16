const controller = require("../controllers/resume.controller");
const { authJwt } = require("../middlewares");
module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/submitResume",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.SubmitResume
      );

   
      app.get(
        "/api/jobList",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.JobList
      );
};