const Booking = require("../models/Booking");
const sgMail = require("@sendgrid/mail");

// set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const bookingController = {
  // Create booking
  createBooking: async (req, res) => {
    try {
      const { userEmail, saloonId, serviceId, date } = req.body;

      const booking = new Booking({
        userEmail,
        saloonId,
        serviceId,
        date,
      });

      await booking.save();

      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  },

  // Get bookings for a user
  getUserBookings: async (req, res) => {
    try {
      const { email } = req.params;
      const bookings = await Booking.find({ userEmail: email })
        .populate("saloonId", "name address")
        .populate("serviceId", "name price duration");

      res.status(200).json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  },

  // Accept booking + send email
  acceptBooking: async (req, res) => {
    try {
      const { id } = req.params;

      console.log("🔎 Trying to accept booking with ID:", id);

      const booking = await Booking.findByIdAndUpdate(
        id,
        { status: "Accepted" },
        { new: true }
      )
        .populate("saloonId", "name address")
        .populate("serviceId", "name price duration");

      if (!booking) {
        console.log("⚠️ No booking found with ID:", id);
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      console.log("✅ Booking found & updated:", booking);

      // send email using SendGrid
      console.log("📨 Sending confirmation email to:", booking.userEmail);
      await bookingController.sendEmail(booking.userEmail, booking);

      res.status(200).json({
        success: true,
        message: "Booking accepted and email sent to user",
        data: booking,
      });
    } catch (error) {
      console.error("❌ Error in acceptBooking:", error.message);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  },

  // Send email via SendGrid
  sendEmail: async (to, booking) => {
    try {
      console.log("🛠 Preparing email payload...");

      const msg = {
        to,
        from: process.env.EMAIL_FROM,
        subject: "Your Booking is Confirmed ✅",
        html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${to},</p>
        <p>Your booking for <b>${booking.serviceId?.name}</b> at <b>${
          booking.saloonId?.name
        }</b> has been <b>ACCEPTED</b>.</p>
        <p><b>Date:</b> ${new Date(booking.date).toLocaleString()}</p>
        <p><b>Location:</b> ${booking.saloonId?.address}</p>
        <br/>
        <p>Thank you for choosing Smart Saloon ✂️</p>
      `,
      };

      console.log("📦 Email Payload:", msg);

      await sgMail.send(msg);
      console.log("📧 Email sent successfully to", to);
    } catch (err) {
      console.error(
        "❌ Email sending failed:",
        err.response?.body || err.message
      );
    }
  },

  // Delete all bookings by user email
  deleteBookingsByEmail: async (req, res) => {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const result = await Booking.deleteMany({ userEmail: email });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "No bookings found for this email",
        });
      }

      res.status(200).json({
        success: true,
        message: `All bookings deleted for ${email}`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  },
};

module.exports = bookingController;
