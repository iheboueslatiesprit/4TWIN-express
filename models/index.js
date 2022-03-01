const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.Promise = global.Promise;
 
const db = {};
db.mongoose = mongoose;
db.localUrl = dbConfig.localUrl;
db.atlasUrl = dbConfig.atlasUrl;
db.HOST = dbConfig.HOST;
db.PORT = dbConfig.PORT;

db.tutorials = require("./tutorial.model.js")(mongoose, mongoosePaginate);
db.user = require("./user.model")
db.role = require("./role.model")
db.resfreshToken = require("./refreshToken.model");
db.ROLES = ["user" , "admin" , "moderator"];

module.exports = db;