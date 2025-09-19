const express = require("express");
const router = express.Router();
const saloonController = require("../controllers/saloonController");

// Public routes

// Create a new salon
router.post("/create", saloonController.createSalon);

// Get all salons (with pagination & filters)
router.get("/get-all-salons", saloonController.getAllSalons);

// Get salon by ID
router.get("/get-salon/:id", saloonController.getSalonById);

// Update salon by ID
router.put("/update/:id", saloonController.updateSalon);

// Delete salon by ID
router.delete("/delete/:id", saloonController.deleteSalon);

// Update salon status (Active/Inactive)
router.put("/update-status/:id", saloonController.updateSalonStatus);

module.exports = router;
