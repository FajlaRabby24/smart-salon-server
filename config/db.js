<<<<<<< HEAD
// config/db.js
=======
>>>>>>> main
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    // process.exit(1); // Exit process with failure
=======
    console.log(process.env.MONODB_URL)
    await mongoose.connect(process.env.MONODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
>>>>>>> main
  }
};

module.exports = connectDB;
