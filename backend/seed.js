require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Project = require('./src/models/Project');
const { calculateRisk } = require('./src/services/riskEngine');
const { calculateStatus } = require('./src/services/projectStatusService');

const seedData = async () => {
  await connectDB();
  console.log('Seeding demo data...');

  await Project.deleteMany({ source: 'DEMO_DATA' });

  const demoProjects = Array.from({ length: 50 }).map((_, i) => {
    const originalCost = Math.floor(Math.random() * 5000) + 100;
    const revisedCost = originalCost * (1 + (Math.random() * 0.5));
    const expenditure = revisedCost * Math.random();
    const physicalProgress = Math.floor(Math.random() * 100);
    
    const p = {
      projectCode: `DEMO-P-${1000 + i}`,
      projectName: `Demo Infrastructure Project ${i}`,
      sector: ['Railways', 'Roads', 'Energy', 'Transport'][Math.floor(Math.random() * 4)],
      ministry: ['Ministry of Railways', 'Ministry of Road Transport', 'Ministry of Power'][Math.floor(Math.random() * 3)],
      state: ['Maharashtra', 'Gujarat', 'Karnataka', 'Delhi', 'Tamil Nadu'][Math.floor(Math.random() * 5)],
      originalCost,
      revisedCost,
      expenditure,
      physicalProgress,
      originalEndDate: new Date(new Date().setMonth(new Date().getMonth() + (Math.random() * 24 - 12))),
      reportingMonth: new Date(),
      source: 'DEMO_DATA'
    };
    
    p.status = calculateStatus(p);
    
    const risk = calculateRisk(p);
    p.riskScore = risk.riskScore;
    p.riskLevel = risk.riskLevel;
    p.riskReasons = risk.riskReasons;
    
    return p;
  });

  await Project.insertMany(demoProjects);
  console.log('Demo data seeded successfully.');
  process.exit(0);
};

seedData();
