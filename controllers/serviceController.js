const Service = require('../models/Service');

const serviceController = {
  // Get all services
  getAllServices: async (req, res) => {
    try {
      const { page = 1, limit = 10, status, category } = req.query;
      const query = {};
      
      if (status) query.status = status;
      if (category) query.category = category;

      const services = await Service.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Service.countDocuments(query);

      res.status(200).json({
        success: true,
        data: services,
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

  // Get service by ID
  getServiceById: async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found'
        });
      }

      res.status(200).json({
        success: true,
        data: service
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Create new service
  createService: async (req, res) => {
    try {
      const { name, price, duration, description, category, image } = req.body;

      // Optional: Check if a service with same name exists
      const existingService = await Service.findOne({ name });
      if (existingService) {
        return res.status(400).json({
          success: false,
          message: 'Service with this name already exists'
        });
      }

      const service = new Service({
        name,
        price,
        duration,
        description,
        category,
        image
      });

      await service.save();

      res.status(201).json({
        success: true,
        message: 'Service created successfully',
        data: service
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

  // Update service
  updateService: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Optional: Prevent duplicate service name
      if (updates.name) {
        const existingService = await Service.findOne({ name: updates.name, _id: { $ne: id } });
        if (existingService) {
          return res.status(400).json({
            success: false,
            message: 'Service name already exists'
          });
        }
      }

      const service = await Service.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true, runValidators: true });

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Service updated successfully',
        data: service
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

  // Delete service
  deleteService: async (req, res) => {
    try {
      const service = await Service.findByIdAndDelete(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Service deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Update service status (Active/Inactive)
  updateServiceStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['Active', 'Inactive'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be Active or Inactive'
        });
      }

      const service = await Service.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found'
        });
      }

      res.status(200).json({
        success: true,
        message: `Service ${status === 'Active' ? 'activated' : 'deactivated'} successfully`,
        data: service
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

module.exports = serviceController;
