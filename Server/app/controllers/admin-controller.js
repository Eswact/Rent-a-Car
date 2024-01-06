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
      console.log(filePath);
      fs.writeFileSync(filePath, imgData, 'base64');
      res.status(200).json({ message: 'Resim başarıyla kaydedildi.' });
    } catch (error) {
      console.error('Resim kaydetme hatası:', error);
      res.status(500).json({ error: 'Bir hata oluştu, resim kaydedilemedi.' });
    }
  }