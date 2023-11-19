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
require("./app/routes/cars-routes")(app);
