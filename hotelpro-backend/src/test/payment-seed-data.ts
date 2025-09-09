import { Payment } from '../models/Payment';

// Seed data for testing ZenoPay payment functionality
export const seedPaymentData = async () => {
  try {
    // Clear existing test data
    await Payment.destroy({ where: { method: 'zenopay' } });

    // Create test payment records
    const testPayments = await Payment.bulkCreate([
      {
        amount: 150000,
        currency: 'TZS',
        method: 'zenopay',
        status: 'completed',
        transactionId: 'ZP_TXN_TEST_001',
        reference: 'HOTEL_TEST_001_ABC123',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+255712345678',
        description: 'Hotel room booking - Deluxe Suite',
        paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test001',
        bookingId: 1
      },
      {
        amount: 85000,
        currency: 'TZS',
        method: 'zenopay',
        status: 'pending',
        transactionId: 'ZP_TXN_TEST_002',
        reference: 'HOTEL_TEST_002_DEF456',
        customerEmail: 'jane.smith@example.com',
        customerPhone: '+255723456789',
        description: 'Hotel room booking - Standard Room',
        paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test002',
        bookingId: 2
      },
      {
        amount: 250000,
        currency: 'TZS',
        method: 'zenopay',
        status: 'failed',
        transactionId: 'ZP_TXN_TEST_003',
        reference: 'HOTEL_TEST_003_GHI789',
        customerEmail: 'mike.wilson@example.com',
        customerPhone: '+255734567890',
        description: 'Hotel room booking - Presidential Suite',
        paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test003',
        bookingId: 3
      },
      {
        amount: 120000,
        currency: 'TZS',
        method: 'zenopay',
        status: 'completed',
        transactionId: 'ZP_TXN_TEST_004',
        reference: 'HOTEL_TEST_004_JKL012',
        customerEmail: 'sarah.johnson@example.com',
        customerPhone: '+255745678901',
        description: 'Hotel room booking - Executive Room',
        paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test004',
        bookingId: 4
      },
      {
        amount: 95000,
        currency: 'TZS',
        method: 'zenopay',
        status: 'pending',
        transactionId: 'ZP_TXN_TEST_005',
        reference: 'HOTEL_TEST_005_MNO345',
        customerEmail: 'david.brown@example.com',
        customerPhone: '+255756789012',
        description: 'Hotel room booking - Superior Room',
        paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test005',
        bookingId: 5
      },
      {
        amount: 180000,
        currency: 'TZS',
        method: 'zenopay',
        status: 'completed',
        transactionId: 'ZP_TXN_TEST_006',
        reference: 'HOTEL_TEST_006_PQR678',
        customerEmail: 'lisa.garcia@example.com',
        customerPhone: '+255767890123',
        description: 'Hotel room booking - Family Suite',
        paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test006',
        bookingId: 6
      },
      {
        amount: 75000,
        currency: 'TZS',
        method: 'zenopay',
        status: 'failed',
        transactionId: 'ZP_TXN_TEST_007',
        reference: 'HOTEL_TEST_007_STU901',
        customerEmail: 'robert.martinez@example.com',
        customerPhone: '+255778901234',
        description: 'Hotel room booking - Economy Room',
        paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test007',
        bookingId: 7
      },
      {
        amount: 200000,
        currency: 'USD',
        method: 'zenopay',
        status: 'completed',
        transactionId: 'ZP_TXN_TEST_008',
        reference: 'HOTEL_TEST_008_VWX234',
        customerEmail: 'international@example.com',
        customerPhone: '+1234567890',
        description: 'Hotel room booking - International Guest Suite',
        paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test008',
        bookingId: 8
      }
    ]);

    console.log(`✅ Successfully seeded ${testPayments.length} test payment records`);
    return testPayments;
  } catch (error) {
    console.error('❌ Error seeding payment data:', error);
    throw error;
  }
};

// Function to run seed data
export const runSeedData = async () => {
  try {
    await seedPaymentData();
    console.log('🎉 Payment seed data completed successfully!');
  } catch (error) {
    console.error('💥 Failed to seed payment data:', error);
  }
};
