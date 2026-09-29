/**
 * Determines project status based on robust rules.
 */
exports.calculateStatus = (project) => {
  if (project.actualCompletionDate || project.physicalProgress >= 100) {
    return 'COMPLETED';
  }
  if (project.physicalProgress === 0 && !project.actualCompletionDate && !project.expenditure) {
    return 'NOT_STARTED';
  }

  let isDelayed = false;
  let isCostOverrun = false;

  const referenceDate = project.reportingMonth || new Date();

  // Check Delay
  // Delay means we have crossed original end date and not completed yet
  if (project.originalEndDate && referenceDate > project.originalEndDate) {
    isDelayed = true;
  } else if (project.revisedEndDate && project.originalEndDate && project.revisedEndDate > project.originalEndDate) {
    // If there is an officially revised end date that is past the original end date, it's delayed
    isDelayed = true;
  }

  // Check Cost Overrun
  if (project.originalCost > 0 && project.revisedCost > project.originalCost * 1.05) { // 5% buffer
    isCostOverrun = true;
  }

  if (isDelayed && isCostOverrun && project.physicalProgress < 50) {
    return 'CRITICAL';
  }
  if (isDelayed) {
    return 'DELAYED';
  }
  if (isCostOverrun) {
    return 'COST_OVERRUN';
  }

  return 'ON_TRACK';
};
