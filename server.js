const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.listen(PORT, () => {
  console.log("Server is running 🚀");
});
