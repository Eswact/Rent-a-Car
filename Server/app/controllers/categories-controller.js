const db = require("../models");
const categories = db.categories;

// Get all categories from the database.
exports.findAll = async (req, res) => {
  try {
    const categoriesData = await categories.find();
    res.json(categoriesData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving categories."
    });
  }
};

// Get category with an id
exports.findOne = async (req, res) => {
  const catId = req.params.id;
  const categoriesData = await categories.find();
  const response = categoriesData.find((item) => item.catId == catId)
  try {
    if(!response) {
      res.status(404).send({ message: "Not found category with id " + catId });
    }
    else {
      res.status(200)
      res.json(response);
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving category with id=" + catId });
  }
};