const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
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
