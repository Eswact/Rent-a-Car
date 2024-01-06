const express = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const admin = require("../controllers/admin-controller");

// router
router.post("/login", admin.login);
router.post("/addBannerImage", upload.single('file'), admin.AddBannerImage);

module.exports = router;