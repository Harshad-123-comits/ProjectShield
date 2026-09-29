const Project = require('../models/Project');
const ProjectSnapshot = require('../models/ProjectSnapshot');
const { parseFilters } = require('../services/analyticsFilterService');

exports.getSummary = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    
    const summary = await Project.aggregate([
      { $match: match },
      { $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          totalOriginalCost: { $sum: '$originalCost' },
          totalRevisedCost: { $sum: '$revisedCost' },
          totalExpenditure: { $sum: '$expenditure' },
          totalCostOverrun: { $sum: '$costOverrunAmount' },
          averagePhysicalProgress: { $avg: '$physicalProgress' },
          delayedProjects: { $sum: { $cond: [{ $eq: ['$status', 'DELAYED'] }, 1, 0] } },
          criticalProjects: { $sum: { $cond: [{ $eq: ['$status', 'CRITICAL'] }, 1, 0] } },
          completedProjects: { $sum: { $cond: [{ $eq: ['$status', 'COMPLETED'] }, 1, 0] } },
          onTrackProjects: { $sum: { $cond: [{ $eq: ['$status', 'ON_TRACK'] }, 1, 0] } },
          highRiskProjects: { $sum: { $cond: [{ $in: ['$riskLevel', ['HIGH', 'CRITICAL']] }, 1, 0] } }
        }
      },
      { $project: { _id: 0 } }
    ]);
    
    res.json({ success: true, data: summary[0] || {
        totalProjects: 0, totalOriginalCost: 0, totalRevisedCost: 0, totalExpenditure: 0,
        totalCostOverrun: 0, averagePhysicalProgress: 0, delayedProjects: 0, criticalProjects: 0,
        completedProjects: 0, onTrackProjects: 0, highRiskProjects: 0
    } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSectors = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    const sectors = await Project.aggregate([
      { $match: match },
      { $group: {
          _id: '$sector',
          projectCount: { $sum: 1 },
          originalCost: { $sum: '$originalCost' },
          revisedCost: { $sum: '$revisedCost' },
          expenditure: { $sum: '$expenditure' },
          averageProgress: { $avg: '$physicalProgress' },
          delayedCount: { $sum: { $cond: [{ $eq: ['$status', 'DELAYED'] }, 1, 0] } },
          highRiskCount: { $sum: { $cond: [{ $in: ['$riskLevel', ['HIGH', 'CRITICAL']] }, 1, 0] } }
        }
      },
      { $project: { _id: 0, sector: '$_id', projectCount: 1, originalCost: 1, revisedCost: 1, expenditure: 1, averageProgress: 1, delayedCount: 1, highRiskCount: 1 } },
      { $sort: { projectCount: -1 } }
    ]);
    res.json({ success: true, data: sectors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStates = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    const states = await Project.aggregate([
      { $match: match },
      { $group: {
          _id: '$state',
          projectCount: { $sum: 1 },
          originalCost: { $sum: '$originalCost' },
          revisedCost: { $sum: '$revisedCost' },
          expenditure: { $sum: '$expenditure' },
          averageProgress: { $avg: '$physicalProgress' },
          delayedCount: { $sum: { $cond: [{ $eq: ['$status', 'DELAYED'] }, 1, 0] } },
          highRiskCount: { $sum: { $cond: [{ $in: ['$riskLevel', ['HIGH', 'CRITICAL']] }, 1, 0] } }
        }
      },
      { $project: { _id: 0, state: '$_id', projectCount: 1, originalCost: 1, revisedCost: 1, expenditure: 1, averageProgress: 1, delayedCount: 1, highRiskCount: 1 } },
      { $sort: { projectCount: -1 } }
    ]);
    res.json({ success: true, data: states });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMinistries = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    const ministries = await Project.aggregate([
      { $match: match },
      { $group: {
          _id: '$ministry',
          projectCount: { $sum: 1 },
          originalCost: { $sum: '$originalCost' },
          revisedCost: { $sum: '$revisedCost' },
          expenditure: { $sum: '$expenditure' },
          averageProgress: { $avg: '$physicalProgress' },
          delayedCount: { $sum: { $cond: [{ $eq: ['$status', 'DELAYED'] }, 1, 0] } },
          criticalCount: { $sum: { $cond: [{ $eq: ['$status', 'CRITICAL'] }, 1, 0] } }
        }
      },
      { $project: { _id: 0, ministry: '$_id', projectCount: 1, originalCost: 1, revisedCost: 1, expenditure: 1, averageProgress: 1, delayedCount: 1, criticalCount: 1 } },
      { $sort: { projectCount: -1 } }
    ]);
    res.json({ success: true, data: ministries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    const ranges = await Project.aggregate([
      { $match: match },
      { $project: {
          range: {
            $switch: {
              branches: [
                { case: { $lte: ['$physicalProgress', 20] }, then: '0-20' },
                { case: { $lte: ['$physicalProgress', 40] }, then: '21-40' },
                { case: { $lte: ['$physicalProgress', 60] }, then: '41-60' },
                { case: { $lte: ['$physicalProgress', 80] }, then: '61-80' },
                { case: { $lt: ['$physicalProgress', 100] }, then: '81-99' },
                { case: { $eq: ['$physicalProgress', 100] }, then: '100' }
              ],
              default: 'Unknown'
            }
          },
          originalCost: 1, revisedCost: 1, expenditure: 1
        }
      },
      { $group: {
          _id: '$range',
          projectCount: { $sum: 1 },
          originalCost: { $sum: '$originalCost' },
          revisedCost: { $sum: '$revisedCost' },
          expenditure: { $sum: '$expenditure' }
        }
      },
      { $project: { _id: 0, range: '$_id', projectCount: 1, originalCost: 1, revisedCost: 1, expenditure: 1 } },
      { $sort: { range: 1 } }
    ]);
    res.json({ success: true, data: ranges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCost = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    const cost = await Project.aggregate([
      { $match: match },
      { $group: {
          _id: null,
          originalCost: { $sum: '$originalCost' },
          revisedCost: { $sum: '$revisedCost' },
          expenditure: { $sum: '$expenditure' },
          costOverrunAmount: { $sum: '$costOverrunAmount' }
        }
      },
      { $project: {
          _id: 0,
          originalCost: 1, revisedCost: 1, expenditure: 1, costOverrunAmount: 1,
          costOverrunPercentage: { $cond: [{ $gt: ['$originalCost', 0] }, { $multiply: [{ $divide: ['$costOverrunAmount', '$originalCost'] }, 100] }, 0] }
        }
      }
    ]);
    res.json({ success: true, data: cost[0] || { originalCost: 0, revisedCost: 0, expenditure: 0, costOverrunAmount: 0, costOverrunPercentage: 0 } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    
    // First get total count for percentages
    const totalResult = await Project.aggregate([{ $match: match }, { $count: "total" }]);
    const total = totalResult.length > 0 ? totalResult[0].total : 0;
    
    const statuses = await Project.aggregate([
      { $match: match },
      { $group: {
          _id: '$status',
          projectCount: { $sum: 1 },
          totalCost: { $sum: '$revisedCost' },
          totalExpenditure: { $sum: '$expenditure' }
        }
      },
      { $project: {
          _id: 0, status: '$_id', projectCount: 1, totalCost: 1, totalExpenditure: 1,
          percentage: total > 0 ? { $multiply: [{ $divide: ['$projectCount', total] }, 100] } : 0
        }
      },
      { $sort: { projectCount: -1 } }
    ]);
    res.json({ success: true, data: statuses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRisk = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    
    const totalResult = await Project.aggregate([{ $match: match }, { $count: "total" }]);
    const total = totalResult.length > 0 ? totalResult[0].total : 0;

    const risks = await Project.aggregate([
      { $match: match },
      { $group: {
          _id: '$riskLevel',
          projectCount: { $sum: 1 },
          totalCost: { $sum: '$revisedCost' }
        }
      },
      { $project: {
          _id: 0, riskLevel: '$_id', projectCount: 1, totalCost: 1,
          percentage: total > 0 ? { $multiply: [{ $divide: ['$projectCount', total] }, 100] } : 0
        }
      },
      { $sort: { projectCount: -1 } }
    ]);
    res.json({ success: true, data: risks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHighRisk = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    match.riskLevel = { $in: ['CRITICAL', 'HIGH'] };
    
    const projects = await Project.find(match)
      .sort({ riskScore: -1 })
      .limit(50)
      .select('projectCode projectName sector ministry state physicalProgress originalCost revisedCost expenditure riskScore riskLevel riskReasons status');
      
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDelays = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    match.status = 'DELAYED';
    const delays = await Project.aggregate([
      { $match: match },
      { $group: {
          _id: null,
          delayedProjectCount: { $sum: 1 },
          averageDelay: { $avg: { $divide: [{ $subtract: ['$revisedEndDate', '$originalEndDate'] }, 1000 * 60 * 60 * 24] } },
          maximumDelay: { $max: { $divide: [{ $subtract: ['$revisedEndDate', '$originalEndDate'] }, 1000 * 60 * 60 * 24] } }
        }
      },
      { $project: { _id: 0 } }
    ]);
    res.json({ success: true, data: delays[0] || { delayedProjectCount: 0, averageDelay: 0, maximumDelay: 0 } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMonthly = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    
    const monthly = await ProjectSnapshot.aggregate([
      { $match: match },
      { $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$reportingMonth" } },
          projectCount: { $sum: 1 },
          originalCost: { $sum: '$originalCost' },
          revisedCost: { $sum: '$revisedCost' },
          expenditure: { $sum: '$expenditure' },
          averageProgress: { $avg: '$physicalProgress' },
          delayedProjects: { $sum: { $cond: [{ $eq: ['$status', 'DELAYED'] }, 1, 0] } },
          totalHighRisk: { $sum: { $cond: [{ $in: ['$riskLevel', ['HIGH', 'CRITICAL']] }, 1, 0] } },
          criticalRisk: { $sum: { $cond: [{ $eq: ['$riskLevel', 'CRITICAL'] }, 1, 0] } },
          costExposureCr: { $sum: { $cond: [{ $in: ['$riskLevel', ['HIGH', 'CRITICAL']] }, { $divide: ['$revisedCost', 1000] }, 0] } }
        }
      },
      { $match: { _id: { $ne: null } } },
      { $project: { _id: 0, month: '$_id', projectCount: 1, originalCost: 1, revisedCost: 1, expenditure: 1, averageProgress: 1, delayedProjects: 1, totalHighRisk: 1, criticalRisk: 1, costExposureCr: 1 } },
      { $sort: { month: 1 } }
    ]);
    
    if (monthly.length === 0) {
      return res.json({
        success: true,
        data: [],
        available: false,
        reason: "Historical monthly records are not available in the imported dataset."
      });
    }
    
    res.json({ success: true, data: monthly, available: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getDataSource = async (req, res) => {
  try {
    const uniqueProjects = await Project.countDocuments();
    const totalSnapshots = await ProjectSnapshot.countDocuments();
    
    const sourceOrgs = await Project.distinct("sourceOrganization");
    const sourceTypes = await Project.distinct("sourceType");
    const periods = await ProjectSnapshot.distinct("reportingMonth");
    const sectors = await Project.distinct("sector");
    const ministries = await Project.distinct("ministry");
    const states = await Project.distinct("state");
    
    const sortedPeriods = periods.map(d => d.toISOString().split('T')[0]).sort();
    
    res.json({
      sourceOrganizations: sourceOrgs.filter(Boolean),
      sourceTypes: sourceTypes.filter(Boolean),
      uniqueProjects,
      totalSnapshots,
      reportingPeriods: sortedPeriods,
      sectors: sectors.length,
      ministries: ministries.length,
      states: states.length,
      oldestReportingPeriod: sortedPeriods[0] || null,
      newestReportingPeriod: sortedPeriods[sortedPeriods.length - 1] || null,
      isCompleteInstitutionalPaimanaDatabase: false,
      coverageDescription: "Official publicly accessible PAIMANA/MoSPI data; not the complete institutional PAIMANA database."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getCoverage = async (req, res) => {
  try {
    const uniqueProjects = await Project.countDocuments();
    const totalSnapshots = await ProjectSnapshot.countDocuments();
    
    const sourceFiles = await Project.distinct("sourceDocument");
    const sourceDocuments = await Project.distinct("sourceDocument");
    const periods = await ProjectSnapshot.distinct("reportingMonth");
    const sectors = await Project.distinct("sector");
    const ministries = await Project.distinct("ministry");
    const states = await Project.distinct("state");
    
    let officialAggregatePeriods = [];
    try {
       const AggregateSnapshot = require("../models/AggregateSnapshot");
       officialAggregatePeriods = await AggregateSnapshot.distinct("reportingMonth");
       officialAggregatePeriods = officialAggregatePeriods.map(d => d.toISOString().split("T")[0]).sort();
    } catch(e) {}
    
    const sortedPeriods = periods.map(d => d.toISOString().split("T")[0]).sort();
    
    res.json({
      uniqueProjects,
      totalSnapshots,
      reportingPeriods: sortedPeriods,
      sourceFiles: sourceFiles.length,
      sourceDocuments,
      sectors: sectors.length,
      ministries: ministries.length,
      states: states.length,
      oldestReportingPeriod: sortedPeriods[0] || null,
      newestReportingPeriod: sortedPeriods[sortedPeriods.length - 1] || null,
      officialAggregatePeriods
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

