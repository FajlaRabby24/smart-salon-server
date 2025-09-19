
const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPostController");

// Public routes

// Create a new blog post
router.post("/create", blogPostController.createBlogPost);

// Get all blog posts (with pagination & filters)
router.get("/get-all-posts", blogPostController.getAllBlogPosts);

// Get a single blog post by ID
router.get("/get-post/:id", blogPostController.getBlogPostById);

// Update a blog post by ID
router.put("/update/:id", blogPostController.updateBlogPost);

// Delete a blog post by ID
router.delete("/delete/:id", blogPostController.deleteBlogPost);

// Update blog post status (Draft/Published/Archived)
router.put("/update-status/:id", blogPostController.updateBlogPostStatus);

module.exports = router;
