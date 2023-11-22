module.exports = app => {
    const cars = require("../controllers/cars-controller.js");
    var router = require("express").Router();

    // Retrieve all Cars
    router.get("/published", cars.findAll);
  
    // Retrieve a single Car with id
    router.get("/:id", cars.findOne);
  
    // Create a new Car
    router.post("/", cars.create);
  
    // Update a Car with id
    router.put("/:id", cars.update);
  
    // Delete a Car with id
    router.delete("/:id", cars.delete);
  
    // Delete all Cars
    router.delete("/", cars.deleteAll);

    // Get car detail with id
    router.get("/detail/:id", cars.getCarDetail);
  
    app.use('/api/cars', router);
};