const Saloon = require('../models/Saloon');

const saloonController = {
  // Get all salons
  getAllSalons: async (req, res) => {
    try {
      const { page = 1, limit = 10, status, city } = req.query;
      const query = {};
      
      if (status) query.status = status;
      if (city) query.city = city;

      const salons = await Saloon.find(query)
        .populate('owner', 'name email phone role')
        // .populate('services', 'name price duration')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Saloon.countDocuments(query);

      res.status(200).json({
        success: true,
        data: salons,
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

  // Get salon by ID
  getSalonById: async (req, res) => {
    try {
      const salon = await Saloon.findById(req.params.id)
        .populate('owner', 'name email phone role')
        .populate('services', 'name price duration');

      if (!salon) {
        return res.status(404).json({
          success: false,
          message: 'Salon not found'
        });
      }

      res.status(200).json({
        success: true,
        data: salon
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Create new salon
  createSalon: async (req, res) => {
    try {
      const { name, owner, email, phone, address, city, image, services, openingHours } = req.body;

      // Optional: Check if a salon with same name already exists
      const existingSalon = await Saloon.findOne({ name });
      if (existingSalon) {
        return res.status(400).json({
          success: false,
          message: 'Salon with this name already exists'
        });
      }

      const salon = new Saloon({
        name,
        owner,
        email,
        phone,
        address,
        city,
        image,
        services,
        openingHours
      });

      await salon.save();

      res.status(201).json({
        success: true,
        message: 'Salon created successfully',
        data: salon
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

  // Update salon
  updateSalon: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Optional: Prevent duplicate salon name
      if (updates.name) {
        const existingSalon = await Saloon.findOne({ name: updates.name, _id: { $ne: id } });
        if (existingSalon) {
          return res.status(400).json({
            success: false,
            message: 'Salon name already exists'
          });
        }
      }

      const salon = await Saloon.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true, runValidators: true })
        .populate('owner', 'name email phone role')
        .populate('services', 'name price duration');

      if (!salon) {
        return res.status(404).json({
          success: false,
          message: 'Salon not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Salon updated successfully',
        data: salon
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

  // Delete salon
  deleteSalon: async (req, res) => {
    try {
      const salon = await Saloon.findByIdAndDelete(req.params.id);
      
      if (!salon) {
        return res.status(404).json({
          success: false,
          message: 'Salon not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Salon deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // Update salon status (active/inactive)
  updateSalonStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['Active', 'Inactive'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be Active or Inactive'
        });
      }

      const salon = await Saloon.findByIdAndUpdate(id, { status }, { new: true, runValidators: true })
        .populate('owner', 'name email phone role')
        .populate('services', 'name price duration');

      if (!salon) {
        return res.status(404).json({
          success: false,
          message: 'Salon not found'
        });
      }

      res.status(200).json({
        success: true,
        message: `Salon ${status === 'Active' ? 'activated' : 'deactivated'} successfully`,
        data: salon
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

module.exports = saloonController;
