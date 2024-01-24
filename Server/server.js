const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const app = express();
// CORS
const corsOptions = {
  origin: ['http://localhost:5072','http://16.171.161.190/'],
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

const routeModules = [
  { path: "/api/cars", module: require("./app/routes/cars-routes") },
  { path: "/api/brands", module: require("./app/routes/brands-routes") },
  { path: "/api/categories", module: require("./app/routes/categories-routes") },
  { path: "/api/company", module: require("./app/routes/company-routes") },
  { path: "/api/home", module: require("./app/routes/home-routes") },
  { path: "/api/admin", module: require("./app/routes/admin-routes") },
];

routeModules.forEach(({ path, module }) => {
  app.use(path, module);
});
