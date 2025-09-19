const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Server is running 🚀");
});
