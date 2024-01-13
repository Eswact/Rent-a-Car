const express = require("express");
const router = express.Router();
const categories = require("../controllers/categories-controller");

// router
router.get("/published", categories.findAll);
router.get("/:id", categories.findOne);

module.exports = router;