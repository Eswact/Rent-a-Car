const express = require("express");
const router = express.Router();
const cars = require("../controllers/cars-controller.js");

// Retrieve all Cars
router.get("/published", cars.findAll);
// Get car detail with id
router.get("/detail/:id", cars.getCarDetail);
// Create a new Car
router.post("/create", cars.create);
// Update a Car with id
router.put("/update/:id", cars.update);
// Delete a Car with id
router.delete("/delete/:id", cars.delete);
// Delete all Cars
router.delete("/deleteAll", cars.deleteAll);

module.exports = router;