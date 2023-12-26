const mongoose = require("mongoose");
require("dotenv").config();

const connected = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to indicate a connection failure
  }
};

module.exports = connected;
