import { Project, RiskLevel } from '../types';

export function calculateRiskLevel(score: number): RiskLevel {
  if (score >= 80) return 'CRITICAL';
  if (score >= 65) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  return 'LOW';
}

export function formatCurrencyCr(amount: number): string {
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)}k Cr`;
  }
  return `₹${amount.toLocaleString()} Cr`;
}

export function exportProjectsToCSV(projects: Project[]): void {
  const headers = [
    'Project ID',
    'Project Name',
    'State',
    'Sector',
    'Agency',
    'Sanctioned Cost (Cr)',
    'Revised Cost (Cr)',
    'Projected Final Cost (Cr)',
    'Physical Progress (%)',
    'Planned Progress (%)',
    'Financial Progress (%)',
    'Schedule Risk (%)',
    'Cost Risk (%)',
    'Overall Risk Score',
    'Risk Level',
    'Expected Delay (Months)',
    'Previous Extensions',
    'Status',
    'Last Updated'
  ];

  const rows = projects.map((p) => [
    `"${p.id}"`,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.state}"`,
    `"${p.sector}"`,
    `"${p.agency}"`,
    p.sanctionedCost,
    p.revisedCost,
    p.projectedFinalCost,
    p.physicalProgress,
    p.plannedProgress,
    p.financialProgress,
    p.scheduleRisk,
    p.costRisk,
    p.overallRisk,
    p.riskLevel,
    p.expectedDelayMonths,
    p.previousExtensions,
    `"${p.status}"`,
    `"${p.lastUpdated}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `ProjectShield_MoSPI_Projects_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
