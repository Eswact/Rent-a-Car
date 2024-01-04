const db = require("../models");
const banners = db.banners;

// Get all banners from the database.
exports.getBanners = async (req, res) => {
    try {
      const bannersData = await banners.find();
      res.json(bannersData);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving brands."
      });
    }
  };

// Create and Save a new banner
exports.createBanner = async (req, res) => {
  const latestBanner = await banners.findOne().sort({ bannerId: -1 });
  req.body.bannerId = latestBanner ? latestBanner.bannerId + 1 : 1
  try {
    const newBanner = new banners(req.body);
    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the banner."
    });
  }
};

// Update a banner by the id in the request
exports.updateBanner = (req, res) => {};

// Delete a banner with the specified id in the request
exports.deleteBanner = async (req, res) => {
  const id = req.params.id;
  try {
    const bannerDeleteResult = await banners.deleteOne({ bannerId: id });
    if (bannerDeleteResult.deletedCount === 0) {
      res.status(404).send({ message: "Not found banner with id " + id });
    } else {
      res.status(200).send({ message: "Banner deleted successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete banner with id=" + id });
  }
};