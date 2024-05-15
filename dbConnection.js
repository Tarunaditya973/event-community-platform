const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection successfulll");
  } catch (err) {
    console.log("Error connecting to DB", err);
  }
};

module.exports = dbConnection;
