// db.js

const mongoose = require("mongoose");

//use enviromental vars
const envUri = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(envUri, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
