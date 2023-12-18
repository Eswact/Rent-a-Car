const dbConfig = require("../config/db-config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.cars = require("./car-model.js")(mongoose);
db.carDetails = require("./car-detail-model.js")(mongoose);
db.brands = require("./brand-model.js")(mongoose);
db.company = require("./company-model.js")(mongoose);

module.exports = db;