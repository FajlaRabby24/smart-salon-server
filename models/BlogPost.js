const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // URL-friendly unique identifier
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String, // store user's email
    required: true,
  },
  categories: [
    {
      type: String, // e.g., "Haircare", "Beauty Tips"
      default: null,
    },
  ],
  tags: [
    {
      type: String, // e.g., ["hairstyle", "tutorial"]
      default: null,
    },
  ],
  image: {
    type: String, // Featured image
    default: null,
  },
  status: {
    type: String,
    enum: ["Published", "Draft", "Archived"],
    default: "Draft",
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
