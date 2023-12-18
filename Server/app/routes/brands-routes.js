const express = require("express");
const router = express.Router();
const brands = require("../controllers/brands-controller");

// router
router.get("/published", brands.findAll);
router.get("/:id", brands.findOne);


module.exports = router;