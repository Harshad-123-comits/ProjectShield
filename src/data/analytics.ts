import { StateSummary, SectorSummary, AgencySummary, RiskDriverSummary } from '../types';

export const STATE_SUMMARIES: StateSummary[] = [
  { state: 'Maharashtra', code: 'MH', totalProjects: 142, highRiskProjects: 29, delayedProjects: 18, totalSanctionedCr: 18420, costExposureCr: 312, avgRiskScore: 61, coordinates: [19.7515, 75.7139] },
  { state: 'Karnataka', code: 'KA', totalProjects: 98, highRiskProjects: 16, delayedProjects: 9, totalSanctionedCr: 12640, costExposureCr: 184, avgRiskScore: 54, coordinates: [15.3173, 75.7139] },
  { state: 'Gujarat', code: 'GJ', totalProjects: 86, highRiskProjects: 14, delayedProjects: 8, totalSanctionedCr: 15300, costExposureCr: 210, avgRiskScore: 48, coordinates: [22.2587, 71.1924] },
  { state: 'Tamil Nadu', code: 'TN', totalProjects: 92, highRiskProjects: 19, delayedProjects: 11, totalSanctionedCr: 14200, costExposureCr: 245, avgRiskScore: 56, coordinates: [11.1271, 78.6569] },
  { state: 'Telangana', code: 'TS', totalProjects: 74, highRiskProjects: 11, delayedProjects: 6, totalSanctionedCr: 9800, costExposureCr: 120, avgRiskScore: 49, coordinates: [18.1124, 79.0193] },
  { state: 'Uttar Pradesh', code: 'UP', totalProjects: 168, highRiskProjects: 31, delayedProjects: 17, totalSanctionedCr: 24500, costExposureCr: 390, avgRiskScore: 58, coordinates: [26.8467, 80.9462] },
  { state: 'Madhya Pradesh', code: 'MP', totalProjects: 84, highRiskProjects: 12, delayedProjects: 6, totalSanctionedCr: 11200, costExposureCr: 140, avgRiskScore: 46, coordinates: [22.9734, 78.6569] },
  { state: 'Rajasthan', code: 'RJ', totalProjects: 78, highRiskProjects: 15, delayedProjects: 7, totalSanctionedCr: 10400, costExposureCr: 165, avgRiskScore: 52, coordinates: [27.0238, 74.2179] },
  { state: 'West Bengal', code: 'WB', totalProjects: 82, highRiskProjects: 17, delayedProjects: 9, totalSanctionedCr: 13100, costExposureCr: 195, avgRiskScore: 55, coordinates: [22.9868, 87.8550] },
  { state: 'Odisha', code: 'OD', totalProjects: 66, highRiskProjects: 13, delayedProjects: 7, totalSanctionedCr: 9400, costExposureCr: 155, avgRiskScore: 53, coordinates: [20.9517, 85.0985] },
  { state: 'Kerala', code: 'KL', totalProjects: 54, highRiskProjects: 7, delayedProjects: 4, totalSanctionedCr: 8200, costExposureCr: 88, avgRiskScore: 42, coordinates: [10.8505, 76.2711] },
  { state: 'Andhra Pradesh', code: 'AP', totalProjects: 88, highRiskProjects: 22, delayedProjects: 14, totalSanctionedCr: 17800, costExposureCr: 410, avgRiskScore: 64, coordinates: [15.9129, 79.7400] },
  { state: 'Bihar', code: 'BR', totalProjects: 72, highRiskProjects: 18, delayedProjects: 11, totalSanctionedCr: 10900, costExposureCr: 230, avgRiskScore: 62, coordinates: [25.0961, 85.3131] },
  { state: 'Punjab', code: 'PB', totalProjects: 48, highRiskProjects: 6, delayedProjects: 3, totalSanctionedCr: 6400, costExposureCr: 72, avgRiskScore: 43, coordinates: [31.1471, 75.3412] },
  { state: 'Haryana', code: 'HR', totalProjects: 52, highRiskProjects: 5, delayedProjects: 2, totalSanctionedCr: 7100, costExposureCr: 65, avgRiskScore: 39, coordinates: [29.0588, 76.0856] },
  { state: 'Delhi', code: 'DL', totalProjects: 46, highRiskProjects: 4, delayedProjects: 2, totalSanctionedCr: 11500, costExposureCr: 55, avgRiskScore: 36, coordinates: [28.7041, 77.1025] }
];

export const SECTOR_SUMMARIES: SectorSummary[] = [
  { sector: 'Transport', totalProjects: 310, avgRisk: 59, totalInvestmentCr: 72400, highRiskCount: 54, avgDelayMonths: 5.4, costEscalationPercent: 14.8 },
  { sector: 'Roads', totalProjects: 345, avgRisk: 52, totalInvestmentCr: 58200, highRiskCount: 42, avgDelayMonths: 4.1, costEscalationPercent: 11.2 },
  { sector: 'Railways', totalProjects: 215, avgRisk: 63, totalInvestmentCr: 84600, highRiskCount: 48, avgDelayMonths: 7.2, costEscalationPercent: 18.5 },
  { sector: 'Energy', totalProjects: 148, avgRisk: 41, totalInvestmentCr: 44100, highRiskCount: 16, avgDelayMonths: 2.8, costEscalationPercent: 7.4 },
  { sector: 'Water', totalProjects: 112, avgRisk: 57, totalInvestmentCr: 28900, highRiskCount: 21, avgDelayMonths: 5.9, costEscalationPercent: 15.1 },
  { sector: 'Urban Infrastructure', totalProjects: 184, avgRisk: 55, totalInvestmentCr: 49300, highRiskCount: 28, avgDelayMonths: 4.8, costEscalationPercent: 13.0 },
  { sector: 'Healthcare', totalProjects: 68, avgRisk: 61, totalInvestmentCr: 16400, highRiskCount: 14, avgDelayMonths: 6.8, costEscalationPercent: 16.4 },
  { sector: 'Education', totalProjects: 66, avgRisk: 38, totalInvestmentCr: 9800, highRiskCount: 7, avgDelayMonths: 2.1, costEscalationPercent: 5.8 }
];

export const AGENCY_SUMMARIES: AgencySummary[] = [
  { agency: 'NHAI', fullName: 'National Highways Authority of India', projectsCount: 284, onTrackPercent: 71, delayedPercent: 14, avgRisk: 51, avgCostEscalationPercent: 11.4 },
  { agency: 'RVNL', fullName: 'Rail Vikas Nigam Limited', projectsCount: 142, onTrackPercent: 62, delayedPercent: 22, avgRisk: 64, avgCostEscalationPercent: 17.8 },
  { agency: 'NTPC', fullName: 'NTPC Limited', projectsCount: 88, onTrackPercent: 82, delayedPercent: 8, avgRisk: 39, avgCostEscalationPercent: 6.9 },
  { agency: 'PowerGrid', fullName: 'Power Grid Corporation of India', projectsCount: 76, onTrackPercent: 86, delayedPercent: 6, avgRisk: 35, avgCostEscalationPercent: 5.4 },
  { agency: 'PWD', fullName: 'State Public Works Departments', projectsCount: 310, onTrackPercent: 65, delayedPercent: 19, avgRisk: 57, avgCostEscalationPercent: 13.2 },
  { agency: 'DMRC', fullName: 'Delhi Metro Rail Corporation', projectsCount: 54, onTrackPercent: 88, delayedPercent: 5, avgRisk: 32, avgCostEscalationPercent: 4.8 },
  { agency: 'Jal Jeevan Mission', fullName: 'National Jal Jeevan Mission', projectsCount: 164, onTrackPercent: 68, delayedPercent: 16, avgRisk: 56, avgCostEscalationPercent: 12.9 },
  { agency: 'AIIMS / CPWD', fullName: 'Ministry of Health / CPWD', projectsCount: 46, onTrackPercent: 58, delayedPercent: 26, avgRisk: 67, avgCostEscalationPercent: 19.1 },
  { agency: 'MMRDA', fullName: 'Mumbai Metropolitan Region Dev Authority', projectsCount: 58, onTrackPercent: 67, delayedPercent: 18, avgRisk: 58, avgCostEscalationPercent: 14.5 }
];

export const TOP_RISK_DRIVERS: RiskDriverSummary[] = [
  { name: 'Physical Progress Gap (Milestone Variance)', frequencyPercent: 82, avgContributionPercent: 32, sectorImpacted: 'Transport, Railways, Roads', severityCategory: 'High' },
  { name: 'Land Acquisition & Right of Way (RoW) Disputes', frequencyPercent: 68, avgContributionPercent: 24, sectorImpacted: 'Roads, Railways, Urban', severityCategory: 'High' },
  { name: 'Contractor Liquidity & Sub-vendor Bottlenecks', frequencyPercent: 54, avgContributionPercent: 18, sectorImpacted: 'All Sectors', severityCategory: 'High' },
  { name: 'Statutory & Forest/Environmental Clearances', frequencyPercent: 46, avgContributionPercent: 15, sectorImpacted: 'Energy, Transport, Water', severityCategory: 'Medium' },
  { name: 'Raw Material Escalation (Steel, Cement, DI Pipe)', frequencyPercent: 41, avgContributionPercent: 12, sectorImpacted: 'Water, Railways, Healthcare', severityCategory: 'Medium' },
  { name: 'Utility Shifting Clearances (Power/Pipes/OHE)', frequencyPercent: 37, avgContributionPercent: 10, sectorImpacted: 'Urban, Transport', severityCategory: 'Medium' },
  { name: 'Adverse Monsoon & Hydro-Geological Surprises', frequencyPercent: 29, avgContributionPercent: 9, sectorImpacted: 'Tunnels, Marine, Dams', severityCategory: 'Low' },
  { name: 'Disbursement & Multilateral Tranche Lags', frequencyPercent: 22, avgContributionPercent: 8, sectorImpacted: 'Healthcare, Urban Metro', severityCategory: 'Low' }
];

export const MONTHLY_HIGH_RISK_TREND = [
  { month: 'Sep 25', totalHighRisk: 145, criticalRisk: 28, costExposureCr: 620 },
  { month: 'Oct 25', totalHighRisk: 152, criticalRisk: 31, costExposureCr: 660 },
  { month: 'Nov 25', totalHighRisk: 158, criticalRisk: 33, costExposureCr: 690 },
  { month: 'Dec 25', totalHighRisk: 161, criticalRisk: 35, costExposureCr: 710 },
  { month: 'Jan 26', totalHighRisk: 169, criticalRisk: 37, costExposureCr: 745 },
  { month: 'Feb 26', totalHighRisk: 174, criticalRisk: 39, costExposureCr: 780 },
  { month: 'Mar 26', totalHighRisk: 178, criticalRisk: 41, costExposureCr: 805 },
  { month: 'Apr 26', totalHighRisk: 184, criticalRisk: 43, costExposureCr: 842 }
];
