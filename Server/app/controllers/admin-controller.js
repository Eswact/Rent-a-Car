const path = require('path');
const fs = require('fs');
const db = require("../models");
const users = db.users;

// Login
exports.login = async (req, res) => {
  try {
    console.log(req.body);  
    const currentUser = await users.findOne({ username: req.body.username, password: req.body.password });
    if (currentUser != null) {
      res.json(currentUser);
    }
    else {
      return res.status(404).send({ message: "User Not found." });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving brands."
    });
  }
};

exports.AddBannerImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenemedi.' });
    }
    const imgData = req.file.buffer.toString('base64');
    const filePath = path.join(__dirname, '../../uploads/banners', req.file.originalname);
    fs.writeFileSync(filePath, imgData, 'base64');
    res.status(200).json({ message: 'Resim başarıyla kaydedildi.' });
  } catch (error) {
    console.error('Resim kaydetme hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu, resim kaydedilemedi.' });
  }
};

exports.AddBrandImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenemedi.' });
    }
    const imgData = req.file.buffer.toString('base64');
    const filePath = path.join(__dirname, '../../uploads/brands', req.file.originalname);
    fs.writeFileSync(filePath, imgData, 'base64');
    res.status(200).json({ message: 'Resim başarıyla kaydedildi.' });
  } catch (error) {
    console.error('Resim kaydetme hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu, resim kaydedilemedi.' });
  }
};

exports.AddCarImages = async (req, res) => {
  try {
    const files = req.files['files'];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Dosya yüklenemedi.' });
    }
    const uploadedImages = [];
    for (const file of files) {
      const imgData = file.buffer.toString('base64');
      const filePath = path.join(__dirname, '../../uploads/cars', file.originalname);
      fs.writeFileSync(filePath, imgData, 'base64');
      uploadedImages.push(file.originalname);
    }
    res.status(200).json({ message: 'Resimler başarıyla kaydedildi.', uploadedImages });
  } catch (error) {
    console.error('Resim kaydetme hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu, resimler kaydedilemedi.' });
  }
};

exports.AddCompanyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenemedi.' });
    }
    const imgData = req.file.buffer.toString('base64');
    const filePath = path.join(__dirname, '../../uploads/company', req.file.originalname);
    fs.writeFileSync(filePath, imgData, 'base64');
    res.status(200).json({ message: 'Resim başarıyla kaydedildi.' });
  } catch (error) {
    console.error('Resim kaydetme hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu, resim kaydedilemedi.' });
  }
};
