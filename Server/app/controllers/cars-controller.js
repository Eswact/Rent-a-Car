const db = require("../models");
const cars = db.cars;
const carDetails = db.carDetails;

// Get all cars from the database.
exports.findAll = async (req, res) => {
  try {
    const carsData = await cars.find();
    res.json(carsData);
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
  const latestCar = await cars.findOne().sort({ carId: -1 });
  req.body.carId = latestCar ? latestCar.carId + 1 : 1
  try {
    const newCar = new cars({
      carId: req.body.carId,
      title: req.body.title,
      brand: req.body.brand,
      category: req.body.category,
      image: req.body.images[0]
    });
    const newCarDetail = new carDetails(req.body);
    const savedCar = await newCar.save();
    const savedCarDetail = await newCarDetail.save(); 
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the car."
    });
  }
};

// Update a car by the id in the request
exports.update = async (req, res) => {
  console.log(req.body)
  try {
    const carId = req.params.id;
    const updateCarData = {
      title: req.body.title,
      brand: req.body.brand,
      category: req.body.category,
      image: req.body.images[0]
    }
    const updateDetailData = req.body;
    const updatedCar = await cars.findOneAndUpdate(
      { carId: carId },
      { $set: updateCarData },
      { new: true }
    );
    const updatedCarDetail = await carDetails.findOneAndUpdate(
      { carId: carId },
      { $set: updateDetailData },
      { new: true }
    );
    if (!updatedCar || !updatedCarDetail) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updateDetailData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating Car."
    });
  }
};

// Delete a car with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const carDeleteResult = await cars.deleteOne({ carId: id });
    const carDetailsDeleteResult = await carDetails.deleteOne({ carId: id });
    if (carDeleteResult.deletedCount === 0 || carDetailsDeleteResult.deletedCount === 0) {
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