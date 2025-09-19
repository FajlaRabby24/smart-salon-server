const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// Public routes
router.post('/login', userController.loginUser);
router.post('/register', userController.createUser);
router.get('/get-all-users',userController.getAllUsers)


module.exports = router;
