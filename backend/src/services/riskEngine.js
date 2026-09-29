/**
 * Calculates risk score (0-100) and assigns risk reasons based on project metrics.
 */
exports.calculateRisk = (project) => {
  let score = 0;
  const reasons = [];

  const referenceDate = project.reportingMonth || new Date();

  // 1. Cost Overrun Risk (max 30 points)
  if (project.originalCost > 0 && project.revisedCost > project.originalCost) {
    const overrunPercent = ((project.revisedCost - project.originalCost) / project.originalCost) * 100;
    if (overrunPercent > 50) {
      score += 30;
      reasons.push('Revised cost is more than 50% above original cost');
    } else if (overrunPercent > 20) {
      score += 20;
      reasons.push('Revised cost is significantly above original cost (20-50%)');
    } else if (overrunPercent > 5) {
      score += 10;
      reasons.push('Minor cost overrun detected');
    }
  }

  // 2. Schedule Risk (max 40 points)
  if (project.originalEndDate) {
    if (referenceDate > project.originalEndDate && project.physicalProgress < 100) {
      score += 40;
      reasons.push('Project has exceeded the original completion date');
    } else if (project.revisedEndDate && project.revisedEndDate > project.originalEndDate) {
      const delayDays = (project.revisedEndDate - project.originalEndDate) / (1000 * 60 * 60 * 24);
      if (delayDays > 365) {
        score += 30;
        reasons.push('Schedule delayed by more than a year');
      } else {
        score += 15;
        reasons.push('Schedule delayed');
      }
    }
  }

  // 3. Progress vs Expenditure Mismatch (max 30 points)
  if (project.revisedCost > 0 && project.physicalProgress > 0) {
    const financialProgress = (project.expenditure / project.revisedCost) * 100;
    const progressGap = financialProgress - project.physicalProgress;
    
    if (progressGap > 30) {
      score += 30;
      reasons.push('Expenditure is severely high relative to physical progress (>30% gap)');
    } else if (progressGap > 15) {
      score += 15;
      reasons.push('Expenditure is high relative to physical progress');
    }
  } else if (project.expenditure > 0 && project.physicalProgress === 0) {
      score += 20;
      reasons.push('Expenditure incurred but physical progress is 0%');
  }

  // 4. Stagnation Risk
  if (project.originalStartDate) {
     const elapsedDays = (referenceDate - project.originalStartDate) / (1000 * 60 * 60 * 24);
     if (elapsedDays > 180 && project.physicalProgress === 0) {
         score += 20;
         reasons.push('Project started over 6 months ago but physical progress remains 0%');
     }
  }

  score = Math.min(score, 100);

  let riskLevel = 'LOW';
  if (score >= 80) riskLevel = 'CRITICAL';
  else if (score >= 60) riskLevel = 'HIGH';
  else if (score >= 30) riskLevel = 'MEDIUM';

  return { riskScore: score, riskLevel, riskReasons: reasons };
};
