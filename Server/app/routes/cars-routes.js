module.exports = app => {
    const cars = require("../controllers/cars-controller.js");
    const brands = require("../controllers/brands-controller.js");

    var router = require("express").Router();

    // Retrieve all Cars
    router.get("/published", cars.findAll);
  
    // Retrieve a single Car with id
    router.get("/find/:id", cars.findOne);
  
    // Create a new Car
    router.post("/create", cars.create);
  
    // Update a Car with id
    router.put("/update/:id", cars.update);
  
    // Delete a Car with id
    router.delete("/delete/:id", cars.delete);
  
    // Delete all Cars
    router.delete("/deleteAll", cars.deleteAll);

    // Get car detail with id
    router.get("/detail/:id", cars.getCarDetail);


    // Retrieve all Brands
    router.get("/brands", brands.findBrands);
  
    app.use('/api/cars', router);
};