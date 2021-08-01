const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.contactus = require("./contactus.model");
db.email = require("./email.model");
db.blog = require("./blog.model");
db.subscriptions = require("./subscriptions.model");
db.page = require("./page.model");
db.pageSection = require("./pageSection.model");
db.pageSubSection = require("./subPageSection.model");

db.ROLES = ["icv_user", "icv_admin", "icv_moderator"];

module.exports = db;