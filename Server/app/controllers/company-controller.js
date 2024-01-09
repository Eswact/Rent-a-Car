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
    const companyId = "658877c170b8c5f264229417";
    const updateData = req.body;
    console.log(companyId)
    const updatedCompany = await company.findOneAndUpdate(
      { _id: companyId },
      { $set: updateData },
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating Company info."
    });
  }
};