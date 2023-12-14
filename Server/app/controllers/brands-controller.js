const db = require("../models");
const brands = db.brands;

// Get all brands from the database.
exports.findAll = async (req, res) => {
  try {
    const brandsData = await brands.find();
    res.json(brandsData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving brands."
    });
  }
};

// Get brand with an id
exports.findOne = async (req, res) => {
  const brandId = req.params.id;
  const brandsData = await brands.find();
  const response = brandsData.find((item) => item.brandId == brandId)
  try {
    if(!response) {
      res.status(404).send({ message: "Not found brand with id " + brandId });
    }
    else {
      res.status(200)
      res.json(response);
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving brand with id=" + id });
  }
};