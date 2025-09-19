const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  category: {
    type: String, // e.g., Haircare, Skincare, Makeup
    default: null,
  },
  image: {
    type: String, // Optional image for the service
    default: null,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Service", serviceSchema);
