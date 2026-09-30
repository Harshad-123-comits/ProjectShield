const mongoose = require('mongoose');

const projectSnapshotSchema = new mongoose.Schema({
  projectCode: { type: String, required: true, index: true },
  reportingMonth: { type: Date, required: true, index: true },
  originalCost: { type: Number },
  revisedCost: { type: Number },
  expenditure: { type: Number },
  physicalProgress: { type: Number },
  originalEndDate: { type: Date },
  revisedEndDate: { type: Date },
  sourceOrganization: { type: String },
  sourceType: { type: String },
  sourceDocument: { type: String },
  sourceURL: { type: String },
  sourcePage: { type: String },
  riskScore: { type: Number },
  riskLevel: { type: String },
  riskReasons: [{ type: String }]
}, {
  timestamps: true
});

projectSnapshotSchema.index({ projectCode: 1, reportingMonth: 1 }, { unique: true });


module.exports = mongoose.model('ProjectSnapshot', projectSnapshotSchema);
