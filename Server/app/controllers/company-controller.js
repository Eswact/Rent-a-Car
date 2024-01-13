const nodemailer = require('nodemailer');
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

exports.sendMail = async (req, res) => {
  try {
    const companyMail = "renterencars@gmail.com";
    const mailData = req.body;
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'renterensmurf@gmail.com',
        pass: 'utgwplwftqgzoejt'
      }
    });
    const mailOptions = {
      from: 'renterensmurf@gmail.com',
      to: companyMail,
      subject: 'Yeni İletişim Formu Mesajı',
      text: `
        Adı Soyadı: ${mailData.name}
        E-posta: ${mailData.email}
        Mesaj: ${mailData.message}
      `
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: 'E-posta başarıyla gönderildi.' });
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    res.status(500).send({
      message: error.message || 'E-posta gönderme işlemi sırasında bir hata oluştu.'
    });
  }
};