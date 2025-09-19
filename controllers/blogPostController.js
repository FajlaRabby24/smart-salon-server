const BlogPost = require('../models/BlogPost');

const blogPostController = {
  // Get all blog posts
  getAllBlogPosts: async (req, res) => {
    try {
      const { page = 1, limit = 10, status, category, author } = req.query;
      const query = {};

      if (status) query.status = status;
      if (category) query.categories = category;
      if (author) query.author = author;

      const blogPosts = await BlogPost.find(query)
        .populate('author', 'name email role')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await BlogPost.countDocuments(query);

      res.status(200).json({
        success: true,
        data: blogPosts,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Get blog post by ID
  getBlogPostById: async (req, res) => {
    try {
      const blogPost = await BlogPost.findById(req.params.id)
        .populate('author', 'name email role');

      if (!blogPost) {
        return res.status(404).json({
          success: false,
          message: 'Blog post not found'
        });
      }

      res.status(200).json({
        success: true,
        data: blogPost
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Create new blog post
  createBlogPost: async (req, res) => {
    try {
      const { title, slug, content, author, categories, tags, image, status } = req.body;

      // Check if a blog post with same slug exists
      const existingPost = await BlogPost.findOne({ slug });
      if (existingPost) {
        return res.status(400).json({
          success: false,
          message: 'Blog post with this slug already exists'
        });
      }

      const blogPost = new BlogPost({
        title,
        slug,
        content,
        author,
        categories,
        tags,
        image,
        status
      });

      await blogPost.save();

      res.status(201).json({
        success: true,
        message: 'Blog post created successfully',
        data: blogPost
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: Object.values(error.errors).map(err => err.message)
        });
      }

      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Update blog post
  updateBlogPost: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Optional: Prevent duplicate slug
      if (updates.slug) {
        const existingPost = await BlogPost.findOne({ slug: updates.slug, _id: { $ne: id } });
        if (existingPost) {
          return res.status(400).json({
            success: false,
            message: 'Slug already exists for another blog post'
          });
        }
      }

      const blogPost = await BlogPost.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).populate('author', 'name email role');

      if (!blogPost) {
        return res.status(404).json({
          success: false,
          message: 'Blog post not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Blog post updated successfully',
        data: blogPost
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: Object.values(error.errors).map(err => err.message)
        });
      }

      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Delete blog post
  deleteBlogPost: async (req, res) => {
    try {
      const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

      if (!blogPost) {
        return res.status(404).json({
          success: false,
          message: 'Blog post not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Blog post deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Update blog post status (Draft/Published/Archived)
  updateBlogPostStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['Published', 'Draft', 'Archived'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be Published, Draft, or Archived'
        });
      }

      const blogPost = await BlogPost.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      ).populate('author', 'name email role');

      if (!blogPost) {
        return res.status(404).json({
          success: false,
          message: 'Blog post not found'
        });
      }

      res.status(200).json({
        success: true,
        message: `Blog post status updated to ${status}`,
        data: blogPost
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  }
};

module.exports = blogPostController;
