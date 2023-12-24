const express = require("express");
const router = express.Router();
const home = require("../controllers/home-controller");

// router
router.get("/banners", home.getBanners);

module.exports = router;