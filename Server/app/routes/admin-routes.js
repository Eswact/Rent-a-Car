const express = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const admin = require("../controllers/admin-controller");

// router
router.post("/login", admin.login);
router.post("/addBannerImage", upload.single('file'), admin.AddBannerImage);
router.post("/addBrandImage", upload.single('file'), admin.AddBrandImage);
router.post("/addCarImage", upload.fields([{ name: 'files' }]), admin.AddCarImages);

module.exports = router;