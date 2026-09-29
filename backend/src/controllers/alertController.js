const Project = require('../models/Project');
const { parseFilters } = require('../services/analyticsFilterService');

exports.getAlerts = async (req, res) => {
  try {
    const match = parseFilters(req.query);
    const projects = await Project.find(match);

    const alerts = [];
    
    for (const p of projects) {
      // 1. Cost Overrun (CRITICAL / HIGH)
      if (p.originalCost != null && p.revisedCost != null && p.originalCost > 0) {
        const overrun = p.revisedCost - p.originalCost;
        if (overrun > 0) {
          const pct = ((overrun / p.originalCost) * 100).toFixed(1);
          if (pct >= 5) { // Only alert if >= 5% overrun
            alerts.push({
              id: `${p.projectCode}-cost-overrun`,
              projectCode: p.projectCode,
              projectName: p.projectName,
              type: 'cost',
              title: 'Significant Cost Overrun Detected',
              message: `Revised cost increased from ₹${p.originalCost} Cr to ₹${p.revisedCost} Cr, a ${pct}% increase.`,
              severity: pct > 20 ? 'CRITICAL' : 'HIGH',
              date: new Date().toISOString(),
              read: false,
              dismissed: false
            });
          }
        }
      }

      // 2. Schedule Delay (CRITICAL / HIGH)
      if (p.originalEndDate && p.revisedEndDate) {
        const orig = new Date(p.originalEndDate);
        const rev = new Date(p.revisedEndDate);
        if (rev > orig) {
          const delayDays = Math.floor((rev - orig) / (1000 * 60 * 60 * 24));
          if (delayDays > 30) { // Only alert if delayed more than a month
            const delayMonths = Math.floor(delayDays / 30);
            alerts.push({
              id: `${p.projectCode}-schedule-delay`,
              projectCode: p.projectCode,
              projectName: p.projectName,
              type: 'schedule',
              title: 'Schedule Revision Identified',
              message: `Project completion has been pushed back by approximately ${delayMonths} months.`,
              severity: delayMonths >= 12 ? 'CRITICAL' : (delayMonths > 3 ? 'HIGH' : 'MEDIUM'),
              date: new Date().toISOString(),
              read: false,
              dismissed: false
            });
          }
        }
      }

      // 3. Weak Progress (MEDIUM / HIGH)
      // Only generate if we have progress AND the project is nearing completion date
      if (p.physicalProgress != null && p.revisedEndDate) {
        const revDate = new Date(p.revisedEndDate);
        const now = new Date();
        const timeRemainingDays = (revDate - now) / (1000 * 60 * 60 * 24);
        
        // If it's supposed to finish within 6 months but progress is under 50%
        if (timeRemainingDays > 0 && timeRemainingDays < 180 && p.physicalProgress < 50) {
          alerts.push({
            id: `${p.projectCode}-weak-progress`,
            projectCode: p.projectCode,
            projectName: p.projectName,
            type: 'progress',
            title: 'Critical Progress Lag',
            message: `Project is scheduled to complete within 6 months, but physical progress is only at ${p.physicalProgress}%.`,
            severity: 'HIGH',
            date: new Date().toISOString(),
            read: false,
            dismissed: false
          });
        }
      }
    }
    
    // Deduplicate and sort by severity (CRITICAL > HIGH > MEDIUM > LOW > INFO)
    const severityRank = { 'CRITICAL': 5, 'HIGH': 4, 'MEDIUM': 3, 'LOW': 2, 'INFO': 1 };
    alerts.sort((a, b) => severityRank[b.severity] - severityRank[a.severity]);

    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
