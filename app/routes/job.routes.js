const controller = require("../controllers/job.controller");
const { authJwt } = require("../middlewares");
module.exports = function(app) {
    app.use(function(req, res, next) {
        next();
    });

    app.post(
        "/api/admin/createJob",
        [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.CreateJob
      );

   
      app.get(
        "/api/jobList",
        // [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
        controller.JobList
      );

    app.post(
      'api/admin/updateJob',
      [authJwt.verifyToken,authJwt.isModeratorOrAdmin],
      controller.updateJobById
    )
};