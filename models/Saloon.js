const mongoose = require("mongoose");

const saloonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Logo or cover image
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References the salon owner (admin or salon role)
    required: true,
  },
  address: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
    validate: {
      validator: function (v) {
        if (!v) return true; // allow null
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  phone: {
    type: String,
    default: null,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  openingHours: {
    monday: { open: { type: String, default: null }, close: { type: String, default: null } },
    tuesday: { open: { type: String, default: null }, close: { type: String, default: null } },
    wednesday: { open: { type: String, default: null }, close: { type: String, default: null } },
    thursday: { open: { type: String, default: null }, close: { type: String, default: null } },
    friday: { open: { type: String, default: null }, close: { type: String, default: null } },
    saturday: { open: { type: String, default: null }, close: { type: String, default: null } },
    sunday: { open: { type: String, default: null }, close: { type: String, default: null } },
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Salon", saloonSchema);
