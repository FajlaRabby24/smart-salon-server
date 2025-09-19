const express = require("express");
const { registerUser, getUsers } = require("../controllers/userController");
const router = express.Router();

// Register new user
router.post("/", registerUser);

// Get all users
router.get("/", getUsers);

module.exports = router;
