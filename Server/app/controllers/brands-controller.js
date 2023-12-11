const db = require("../models");
const brands = db.brands;

// Get all brands from the database.
exports.findBrands = async (req, res) => {
    try {
      const brandsData = await brands.find();
      res.json(brandsData);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving brands."
      });
    }
  };