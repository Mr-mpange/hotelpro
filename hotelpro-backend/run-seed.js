// Script to run payment seed data for testing
const { runSeedData } = require('./src/test/payment-seed-data.ts');

// Run the seed data function
runSeedData()
  .then(() => {
    console.log('✅ Seed data script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed data script failed:', error);
    process.exit(1);
  });
