require("dotenv").config();
module.exports = {
    // url: "mongodb://127.0.0.1:27017/rentAcar"
    url: process.env.MONGODB_CONNECTION
};