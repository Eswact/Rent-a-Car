const db = require("../models");
const company = db.company;

// Get all company data.
exports.getData = async (req, res) => {
  try {
    const companyData = await company.find();
    res.json(companyData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Company info."
    });
  }
};

exports.updateData = async (req, res) => {
  try {
    const companyData = await company.find();
    res.json(companyData);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating Company info."
    });
  }
};