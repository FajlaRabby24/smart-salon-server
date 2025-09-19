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


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/saloon", require("./routes/saloonRoutes"));
app.use("/api/service", require("./routes/serviceRoutes"));
app.use("/api/blog", require("./routes/blogPostRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"))




app.get("/", (req, res) => {
  res.send("App works properly!");
});

app.listen(PORT, () => {
  console.log("Server is running 🚀");
});
