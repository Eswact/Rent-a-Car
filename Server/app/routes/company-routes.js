const express = require("express");
const router = express.Router();
const company = require("../controllers/company-controller");

// router
router.get("/published", company.getData);
router.post("/update", company.updateData);

module.exports = router;