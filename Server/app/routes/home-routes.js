const express = require("express");
const router = express.Router();
const home = require("../controllers/home-controller");

// router
router.get("/banners", home.getBanners);
router.post("/banners/create", home.createBanner);
router.post("/banners/delete/:id", home.deleteBanner);

module.exports = router;