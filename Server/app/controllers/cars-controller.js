const db = require("../models");
const cars = db.cars;
const carDetails = db.carDetails;

// Get all cars from the database.
exports.findAll = async (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const carsData = await cars.find();
    res.json(carsData);
    // console.log('Request Headers:', req.headers);
    // console.log('Bağlantı başarılı');
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving cars."
    });
  }
};

// Find a single car with an id
exports.findOne = (req, res) => {};

// Create and Save a new car
exports.create = (req, res) => {};

// Update a car by the id in the request
exports.update = (req, res) => {};

// Delete a car with the specified id in the request
exports.delete = (req, res) => {};

// Delete all cars from the database.
exports.deleteAll = (req, res) => {};

// Get car detail with an id
exports.getCarDetail = async (req, res) => {
  const carId = req.params.id;
  const detailData = await carDetails.find();
  const response = detailData.find((item) => item.carId == carId)
  try {
    if(!response) {
      res.status(404).send({ message: "Not found car with id " + carId });
    }
    else {
      res.status(200)
      res.json(response);
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving car with id=" + id });
  }
};