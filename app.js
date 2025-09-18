const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// database connection with mongoose
mongoose
  .connect(process.env.MONODB_URL)
  .then(() => console.log("DB connection successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/hello", (req, res) => {
  res.send("this is new route");
});

app.listen(PORT, () => {
  console.log("Server is running 🚀");
});
