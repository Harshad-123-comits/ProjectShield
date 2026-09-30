const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { calculateRisk } = require('./src/services/riskEngine');
const ProjectSnapshot = require('./src/models/ProjectSnapshot');

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const snapshots = await ProjectSnapshot.find({});
    
    console.log(`Found ${snapshots.length} snapshots. Updating risk levels...`);
    
    let updated = 0;
    for (const snap of snapshots) {
      const risk = calculateRisk(snap);
      await ProjectSnapshot.updateOne(
        { _id: snap._id }, 
        { $set: { riskLevel: risk.riskLevel, riskScore: risk.riskScore, riskReasons: risk.riskReasons } }
      );
      updated++;
      if (updated % 100 === 0) console.log(`Updated ${updated} snapshots...`);
    }
    
    console.log(`Done updating ${updated} snapshots!`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
})();
