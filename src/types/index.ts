export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ProjectStatus = 'ON_TRACK' | 'AT_RISK' | 'DELAYED' | 'COMPLETED';

export type SectorType = 
  | 'Transport' 
  | 'Roads' 
  | 'Railways' 
  | 'Energy' 
  | 'Water' 
  | 'Urban Infrastructure' 
  | 'Healthcare' 
  | 'Education';

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface ShapDriver {
  factor: string;
  impactPercent: number; // e.g. +31%
  category: 'Physical' | 'Administrative' | 'Financial' | 'Contractor' | 'Environmental' | 'Regulatory';
  description: string;
}

export interface Recommendation {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  action: string;
  reason: string;
  suggestedOwner: string;
  deadlineDays: number;
  status?: 'Pending' | 'In Progress' | 'Resolved';
}

export interface MonthlyProgressPoint {
  month: string; // e.g. "Jan 25", "Feb 25"
  plannedPhysical: number;
  actualPhysical: number;
  plannedFinancial: number;
  actualFinancial: number;
  riskScore: number;
}

export interface CostTimelinePoint {
  stage: string;
  amountCr: number;
  date: string;
}

export interface ScheduleMilestone {
  label: string;
  date: string;
  type: 'start' | 'original_end' | 'extension_1' | 'extension_2' | 'predicted_end';
  status: 'completed' | 'delayed' | 'projected';
}

export interface Project {
  id: string; // e.g. "P-1042"
  name: string;
  state: string;
  sector: SectorType;
  agency: string; // e.g. NHAI, RVNL, NTPC, PWD
  sanctionedCost: number; // in Crores
  revisedCost: number; // in Crores
  projectedFinalCost: number; // in Crores
  originalStartDate: string;
  originalEndDate: string;
  expectedEndDate: string;
  physicalProgress: number; // % (0-100)
  plannedProgress: number; // % (0-100)
  financialProgress: number; // % (0-100)
  plannedFinancialProgress: number; // % (0-100)
  scheduleRisk: number; // % probability (0-100)
  costRisk: number; // % probability (0-100)
  overallRisk: number; // Score (0-100)
  riskLevel: RiskLevel;
  expectedDelayMonths: number;
  previousExtensions: number;
  status: ProjectStatus;
  lastUpdated: string;
  description?: string;
  keyLocation?: string;
  contractorName?: string;
  riskDrivers: ShapDriver[];
  recommendations: Recommendation[];
  monthlyProgress: MonthlyProgressPoint[];
  milestones?: ScheduleMilestone[];
}

export interface Alert {
  id: string;
  projectId: string;
  projectName: string;
  severity: AlertSeverity;
  trigger: string;
  currentRiskScore: number;
  timestamp: string;
  read: boolean;
  dismissed: boolean;
  category: 'Schedule' | 'Cost' | 'Progress' | 'Regulatory' | 'Contractor';
  details: string;
}

export interface StateSummary {
  state: string;
  code: string;
  totalProjects: number;
  highRiskProjects: number;
  delayedProjects: number;
  totalSanctionedCr: number;
  costExposureCr: number;
  avgRiskScore: number;
  coordinates: [number, number]; // [lat, lng] approx for visual positioning
}

export interface SectorSummary {
  sector: SectorType;
  totalProjects: number;
  avgRisk: number;
  totalInvestmentCr: number;
  highRiskCount: number;
  avgDelayMonths: number;
  costEscalationPercent: number;
}

export interface AgencySummary {
  agency: string;
  fullName: string;
  projectsCount: number;
  onTrackPercent: number;
  delayedPercent: number;
  avgRisk: number;
  avgCostEscalationPercent: number;
}

export interface RiskDriverSummary {
  name: string;
  frequencyPercent: number;
  avgContributionPercent: number;
  sectorImpacted: string;
  severityCategory: 'High' | 'Medium' | 'Low';
}

export interface ModelComparisonMetric {
  modelName: string;
  task: 'Schedule Risk' | 'Cost Overrun';
  type: 'Statistical' | 'Machine Learning';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc?: number;
  rmseCr?: number;
  maeCr?: number;
  trainingTimeSec: number;
  inferenceTimeMs: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  referencedProjectId?: string;
  structuredData?: {
    type: 'project_card' | 'comparison' | 'recommendations' | 'ranking' | 'alert_summary';
    title?: string;
    riskScore?: number;
    riskLevel?: RiskLevel;
    metrics?: { label: string; value: string | number; change?: string }[];
    drivers?: { factor: string; impact: string }[];
    recommendedActions?: string[];
    comparisonRows?: { label: string; itemA: string | number; itemB: string | number }[];
  };
}

export interface UserProfile {
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
}

export interface UploadRecord {
  id: string;
  projectName: string;
  state: string;
  sector: string;
  agency: string;
  sanctionedCost: string | number;
  physicalProgress: string | number;
  status: string;
  isValid: boolean;
  errors?: string[];
}
