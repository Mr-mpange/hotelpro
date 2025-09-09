import { QueryInterface, DataTypes } from 'sequelize';

export const updatePaymentSchema = async (queryInterface: QueryInterface) => {
  try {
    // Check if columns exist before adding them
    const tableDescription = await queryInterface.describeTable('Payments');
    
    // Add currency column if it doesn't exist
    if (!tableDescription.currency) {
      await queryInterface.addColumn('Payments', 'currency', {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'TZS'
      });
      console.log('✅ Added currency column');
    }

    // Add status column if it doesn't exist
    if (!tableDescription.status) {
      await queryInterface.addColumn('Payments', 'status', {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending'
      });
      console.log('✅ Added status column');
    }

    // Add transactionId column if it doesn't exist
    if (!tableDescription.transactionId) {
      await queryInterface.addColumn('Payments', 'transactionId', {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      });
      console.log('✅ Added transactionId column');
    }

    // Add reference column if it doesn't exist
    if (!tableDescription.reference) {
      await queryInterface.addColumn('Payments', 'reference', {
        type: DataTypes.STRING,
        allowNull: true // Make nullable initially to avoid issues with existing records
      });
      console.log('✅ Added reference column');
    }

    // Add customerEmail column if it doesn't exist
    if (!tableDescription.customerEmail) {
      await queryInterface.addColumn('Payments', 'customerEmail', {
        type: DataTypes.STRING,
        allowNull: true // Make nullable initially
      });
      console.log('✅ Added customerEmail column');
    }

    // Add customerPhone column if it doesn't exist
    if (!tableDescription.customerPhone) {
      await queryInterface.addColumn('Payments', 'customerPhone', {
        type: DataTypes.STRING,
        allowNull: true
      });
      console.log('✅ Added customerPhone column');
    }

    // Add description column if it doesn't exist
    if (!tableDescription.description) {
      await queryInterface.addColumn('Payments', 'description', {
        type: DataTypes.TEXT,
        allowNull: true
      });
      console.log('✅ Added description column');
    }

    // Add paymentUrl column if it doesn't exist
    if (!tableDescription.paymentUrl) {
      await queryInterface.addColumn('Payments', 'paymentUrl', {
        type: DataTypes.TEXT,
        allowNull: true
      });
      console.log('✅ Added paymentUrl column');
    }

    // Update method column default value
    if (tableDescription.method) {
      await queryInterface.changeColumn('Payments', 'method', {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'zenopay'
      });
      console.log('✅ Updated method column default value');
    }

    console.log('🎉 Payment table schema update completed successfully!');
    
  } catch (error) {
    console.error('❌ Error updating payment schema:', error);
    throw error;
  }
};
