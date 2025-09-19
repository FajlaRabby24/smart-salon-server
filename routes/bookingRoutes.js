const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Create booking
router.post("/create", bookingController.createBooking);

// Get bookings by user email
router.get("/user/:email", bookingController.getUserBookings);

// Accept booking (saloon action)
router.put("/accept/:id", bookingController.acceptBooking);

// DELETE all bookings by user email
router.delete("/delete-by-email/:email", bookingController.deleteBookingsByEmail);

module.exports = router;
