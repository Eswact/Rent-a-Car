const express = require("express");
const router = express.Router();
const brands = require("../controllers/brands-controller");

// Define your routes for brands
router.get("/published", brands.findAll);

module.exports = router;