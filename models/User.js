const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
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
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  phone: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "saloon", "admin"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);