const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000/"
};

app.use(cors());

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));

const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect('mongodb+srv://ZCGawUWxCKWeS23k:GRVjFN5A60mzVHYo@cluster0.6a3sf.mongodb.net/icvAdmin?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// db.setProfilingLevel(2)
// console.log(db.setProfilingLevel(2))


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to icv admin application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/contact.routes")(app);
require("./app/routes/email.routes")(app);
require("./app/routes/blog.routes")(app);
require("./app/routes/pages.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/address.routes")(app);
require("./app/routes/socialmedia.routes")(app);
require("./app/routes/sitesettings.routes")(app);
require("./app/routes/job.routes")(app);
require("./app/routes/resume.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      new Role({
        name: "icv_user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "icv_moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "icv_admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
