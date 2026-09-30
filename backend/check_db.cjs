const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const snap = await mongoose.connection.collection('projectsnapshots').findOne({});
    console.log(snap);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
})();
