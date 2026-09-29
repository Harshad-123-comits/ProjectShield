const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectCode: { type: String, required: true, unique: true, index: true },
  projectName: { type: String, required: true },
  sector: { type: String, index: true },
  ministry: { type: String, index: true },
  department: { type: String },
  state: { type: String, index: true },
  implementingAgency: { type: String },
  
  originalCost: { type: Number, default: 0 },
  revisedCost: { type: Number, default: 0 },
  expenditure: { type: Number, default: 0 },
  physicalProgress: { type: Number, default: 0, min: 0, max: 100, index: true },
  
  originalStartDate: { type: Date },
  originalEndDate: { type: Date },
  revisedStartDate: { type: Date },
  revisedEndDate: { type: Date },
  actualCompletionDate: { type: Date },
  
  status: { type: String, index: true, enum: ['COMPLETED', 'ON_TRACK', 'DELAYED', 'COST_OVERRUN', 'CRITICAL', 'NOT_STARTED'] },
  
  costOverrunAmount: { type: Number, default: 0 },
  costOverrunPercentage: { type: Number, default: 0 },
  timeOverrunDays: { type: Number, default: 0 },
  timeOverrunPercentage: { type: Number, default: 0 },
  
  riskScore: { type: Number, default: 0 },
  riskLevel: { type: String, index: true, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
  riskReasons: [{ type: String }],
  
  reportingMonth: { type: Date, index: true },
  
  latitude: { type: Number },
  longitude: { type: Number },
  
  source: { type: String, default: 'PAIMANA' },
  sourceUpdatedAt: { type: Date },
  
  sourceOrganization: { type: String },
  sourceType: { type: String },
  sourceDocument: { type: String },
  sourceURL: { type: String },
  sourcePage: { type: String }
}, {
  timestamps: true
});

// Text index for search
projectSchema.index({ projectName: 'text', projectCode: 'text', ministry: 'text', implementingAgency: 'text' });


module.exports = mongoose.model('Project', projectSchema);
