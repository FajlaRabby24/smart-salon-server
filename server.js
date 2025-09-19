const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("App works properly!");
});

app.listen(PORT, () => {
  console.log("Server is running 🚀");
});
