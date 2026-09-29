import { ModelComparisonMetric } from '../types';

export const SCHEDULE_RISK_MODELS: ModelComparisonMetric[] = [
  {
    modelName: 'XGBoost Classifier (Gradient Boosted Trees)',
    task: 'Schedule Risk',
    type: 'Machine Learning',
    accuracy: 0.892,
    precision: 0.874,
    recall: 0.865,
    f1Score: 0.869,
    rocAuc: 0.884,
    trainingTimeSec: 4.8,
    inferenceTimeMs: 2.1
  },
  {
    modelName: 'Random Forest Classifier (Ensemble Trees)',
    task: 'Schedule Risk',
    type: 'Machine Learning',
    accuracy: 0.835,
    precision: 0.812,
    recall: 0.798,
    f1Score: 0.805,
    rocAuc: 0.812,
    trainingTimeSec: 8.2,
    inferenceTimeMs: 4.6
  },
  {
    modelName: 'Logistic Regression (L2 Regularized Baseline)',
    task: 'Schedule Risk',
    type: 'Statistical',
    accuracy: 0.741,
    precision: 0.710,
    recall: 0.680,
    f1Score: 0.695,
    rocAuc: 0.740,
    trainingTimeSec: 0.4,
    inferenceTimeMs: 0.5
  }
];

export const COST_OVERRUN_MODELS: ModelComparisonMetric[] = [
  {
    modelName: 'XGBoost Regressor (Optuna Tuned)',
    task: 'Cost Overrun',
    type: 'Machine Learning',
    accuracy: 0.884,
    precision: 0.860,
    recall: 0.870,
    f1Score: 0.865,
    rmseCr: 21.4,
    maeCr: 14.8,
    trainingTimeSec: 5.2,
    inferenceTimeMs: 2.3
  },
  {
    modelName: 'Random Forest Regressor (300 Estimators)',
    task: 'Cost Overrun',
    type: 'Machine Learning',
    accuracy: 0.818,
    precision: 0.795,
    recall: 0.810,
    f1Score: 0.802,
    rmseCr: 29.8,
    maeCr: 19.6,
    trainingTimeSec: 9.1,
    inferenceTimeMs: 5.0
  },
  {
    modelName: 'Ordinary Least Squares Linear Regression',
    task: 'Cost Overrun',
    type: 'Statistical',
    accuracy: 0.710,
    precision: 0.680,
    recall: 0.690,
    f1Score: 0.685,
    rmseCr: 42.6,
    maeCr: 31.2,
    trainingTimeSec: 0.3,
    inferenceTimeMs: 0.4
  }
];

export const ROC_CURVE_DATA = [
  { fpr: 0.0, xgboost: 0.0, randomForest: 0.0, logisticRegression: 0.0, baseline: 0.0 },
  { fpr: 0.05, xgboost: 0.38, randomForest: 0.28, logisticRegression: 0.16, baseline: 0.05 },
  { fpr: 0.10, xgboost: 0.62, randomForest: 0.48, logisticRegression: 0.32, baseline: 0.10 },
  { fpr: 0.15, xgboost: 0.76, randomForest: 0.62, logisticRegression: 0.45, baseline: 0.15 },
  { fpr: 0.20, xgboost: 0.84, randomForest: 0.71, logisticRegression: 0.56, baseline: 0.20 },
  { fpr: 0.30, xgboost: 0.91, randomForest: 0.82, logisticRegression: 0.69, baseline: 0.30 },
  { fpr: 0.40, xgboost: 0.95, randomForest: 0.88, logisticRegression: 0.78, baseline: 0.40 },
  { fpr: 0.60, xgboost: 0.98, randomForest: 0.94, logisticRegression: 0.88, baseline: 0.60 },
  { fpr: 0.80, xgboost: 0.99, randomForest: 0.98, logisticRegression: 0.95, baseline: 0.80 },
  { fpr: 1.0, xgboost: 1.0, randomForest: 1.0, logisticRegression: 1.0, baseline: 1.0 }
];

export const GLOBAL_FEATURE_IMPORTANCE = [
  { feature: 'Physical Progress Deficit (% vs Planned)', weight: 0.312, category: 'Milestone Variance' },
  { feature: 'Historical Timeline Extensions Granted', weight: 0.218, category: 'Administrative' },
  { feature: 'Contractor Payment Velocity & Liquidity Ratio', weight: 0.145, category: 'Contractor' },
  { feature: 'Right of Way (RoW) / Land Acquisition Gap', weight: 0.134, category: 'Regulatory' },
  { feature: 'Financial Disbursement Lag (% of Sanction)', weight: 0.089, category: 'Financial' },
  { feature: 'Geotechnical & Terrain Hazard Index', weight: 0.058, category: 'Environmental' },
  { feature: 'Inter-Agency Utility Relocation Approvals', weight: 0.044, category: 'Inter-Departmental' }
];

export const CONFUSION_MATRIX = {
  truePositive: 162,
  falsePositive: 22,
  falseNegative: 25,
  trueNegative: 1039,
  precision: '88.0%',
  recall: '86.6%',
  specificity: '97.9%'
};
