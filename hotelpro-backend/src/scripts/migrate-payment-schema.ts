import { sequelize } from '../db';
import { updatePaymentSchema } from '../migrations/update-payment-schema';

const runMigration = async () => {
  try {
    console.log('🚀 Starting payment schema migration...');
    
    // Get query interface
    const queryInterface = sequelize.getQueryInterface();
    
    // Run the migration
    await updatePaymentSchema(queryInterface);
    
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  runMigration();
}

export { runMigration };
