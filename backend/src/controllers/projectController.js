const Project = require('../models/Project');
const { parseFilters } = require('../services/analyticsFilterService');

exports.getProjects = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    let sort = {};
    if (req.query.sort) {
      sort[req.query.sort] = req.query.sortOrder === 'desc' ? -1 : 1;
    } else {
      sort = { riskScore: -1 }; // default sorting
    }

    const projects = await Project.find(match)
      .sort(sort)
      .skip(skip)
      .limit(limit);
      
    const totalRecords = await Project.countDocuments(match);
    
    res.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    // Lookup by projectCode or MongoDB _id
    const query = { $or: [{ projectCode: req.params.id }] };
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      query.$or.push({ _id: req.params.id });
    }
    
    const project = await Project.findOne(query);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found', errorCode: 'PROJECT_NOT_FOUND' });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
