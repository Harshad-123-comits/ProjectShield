const mongoose = require('mongoose');
const aggregateSnapshotSchema = new mongoose.Schema({
  reportingMonth: { type: Date, required: true },
  sector: { type: String, default: 'ALL' },
  projectCount: { type: Number },
  originalCost: { type: Number },
  revisedCost: { type: Number },
  expenditure: { type: Number },
  sourceOrganization: { type: String },
  sourceType: { type: String },
  sourceDocument: { type: String },
  sourceURL: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('AggregateSnapshot', aggregateSnapshotSchema);