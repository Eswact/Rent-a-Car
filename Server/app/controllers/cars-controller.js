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

// Create and Save a new car
exports.create = async (req, res) => {
  let allCars = await cars.find();
  req.body.carId = allCars.length + 1;
  try {
    const newCar = new cars(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the car."
    });
  }
};

// Update a car by the id in the request
exports.update = (req, res) => {};

// Delete a car with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await cars.deleteOne({ carId: id });
    if (result.deletedCount === 0) {
      res.status(404).send({ message: "Not found car with id " + id });
    } else {
      res.status(200).send({ message: "Car deleted successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete car with id=" + id });
  }
};

// Delete all cars from the database.
exports.deleteAll = (req, res) => {};