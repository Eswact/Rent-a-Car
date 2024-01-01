const db = require("../models");
const users = db.users;

// Login
exports.login = async (req, res) => {
    try {
      console.log(req.body);  
      const currentUser = await users.findOne({ username: req.body.username, password: req.body.password });
      res.json(currentUser);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving brands."
      });
    }
  };