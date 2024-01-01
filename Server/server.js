const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();
// CORS
const corsOptions = {
  origin: ['http://localhost:5173','http://localhost:5072'],
};
app.use(cors(corsOptions));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// show uploads static file
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// set port & listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// db connection
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Server." });
});
const carsRoutes = require("./app/routes/cars-routes");
const brandsRoutes = require("./app/routes/brands-routes");
const companyRoutes = require("./app/routes/company-routes");
const homeRoutes = require("./app/routes/home-routes");
const adminRoutes = require("./app/routes/admin-routes");
app.use("/api/cars", carsRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);