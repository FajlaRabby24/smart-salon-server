const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Public routes

// Create service
router.post("/create", serviceController.createService);

// Get all services (with pagination & filters)
router.get("/get-all-services", serviceController.getAllServices);

// Get service by ID
router.get("/get-service/:id", serviceController.getServiceById);

// Update service
router.put("/update/:id", serviceController.updateService);

// Delete service
router.delete("/delete/:id", serviceController.deleteService);

// Update service status
router.put("/update-status/:id", serviceController.updateServiceStatus);

module.exports = router;
