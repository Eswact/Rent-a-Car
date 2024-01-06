const db = require("../models");
const users = db.users;

// Login
exports.login = async (req, res) => {
    try {
      console.log(req.body);  
      const currentUser = await users.findOne({ username: req.body.username, password: req.body.password });
      if (currentUser != null) {
        res.json(currentUser);
      }
      else {
        return res.status(404).send({ message: "User Not found." });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving brands."
      });
    }
  };

exports.AddBannerImage = async (req, res) => {
    var newImg = req.body.img;
}