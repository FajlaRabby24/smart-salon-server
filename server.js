const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();
=======
>>>>>>> main
const PORT = process.env.PORT || 3000;
const app = express();
<<<<<<< HEAD
connectDB();
=======
app.use(express.json());
>>>>>>> main

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send("hello world");
});
=======
>>>>>>> main

app.listen(PORT, () => {
  console.log("Server is running 🚀");
});
