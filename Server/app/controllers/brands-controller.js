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
    res.status(500).send({ message: "Error retrieving brand with id=" + brandId });
  }
};

// Create and Save a new brand
exports.create = async (req, res) => {
  const latestBrand = await brands.findOne().sort({ brandId: -1 });
  req.body.brandId = latestBrand ? latestBrand.brandId + 1 : 1;
  try {
    const newBrand = new brands(req.body);
    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the brand."
    });
  }
};

// Delete a brand with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const brandDeleteResult = await brands.deleteOne({ brandId: id });
    if (brandDeleteResult.deletedCount === 0) {
      res.status(404).send({ message: "Not found brand with id " + id });
    } else {
      res.status(200).send({ message: "Brand deleted successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete brand with id=" + id });
  }
};