const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(process.env.MONODB_URL);
    await mongoose.connect(process.env.MONODB_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
