const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT, dbUri } = require("./constants");
const { loadRoutes } = require("./loaders/loadRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
loadRoutes(app);

const start = async () => {
  try {
    console.log({dbUri});
    await mongoose.connect(dbUri);
    app.listen(PORT, () => {
      console.log(`Server listens on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
