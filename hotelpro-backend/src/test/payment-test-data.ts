// Test data for ZenoPay payment integration

export const testPaymentRequests = [
  {
    amount: 150000,
    currency: 'TZS',
    customerEmail: 'john.doe@example.com',
    customerPhone: '+255712345678',
    description: 'Hotel room booking - Deluxe Suite',
    bookingId: 1
  },
  {
    amount: 85000,
    currency: 'TZS',
    customerEmail: 'jane.smith@example.com',
    customerPhone: '+255723456789',
    description: 'Hotel room booking - Standard Room',
    bookingId: 2
  },
  {
    amount: 250000,
    currency: 'TZS',
    customerEmail: 'mike.wilson@example.com',
    customerPhone: '+255734567890',
    description: 'Hotel room booking - Presidential Suite',
    bookingId: 3
  },
  {
    amount: 120000,
    currency: 'TZS',
    customerEmail: 'sarah.johnson@example.com',
    customerPhone: '+255745678901',
    description: 'Hotel room booking - Executive Room',
    bookingId: 4
  },
  {
    amount: 95000,
    currency: 'TZS',
    customerEmail: 'david.brown@example.com',
    customerPhone: '+255756789012',
    description: 'Hotel room booking - Superior Room',
    bookingId: 5
  }
];

export const testZenoPayResponses = {
  successful: {
    success: true,
    transactionId: 'ZP_TXN_' + Date.now(),
    paymentUrl: 'https://checkout.zenopay.com/pay/ZP_TXN_' + Date.now(),
    status: 'pending' as const,
    message: 'Payment initiated successfully'
  },
  failed: {
    success: false,
    transactionId: '',
    status: 'failed' as const,
    message: 'Insufficient funds or invalid payment method'
  }
};

export const testWebhookData = [
  {
    transactionId: 'ZP_TXN_1704723600000',
    status: 'completed',
    amount: 150000,
    currency: 'TZS',
    reference: 'HOTEL_1704723600000_abc123def',
    signature: 'test_signature_hash',
    timestamp: '2024-01-08T12:00:00Z'
  },
  {
    transactionId: 'ZP_TXN_1704723660000',
    status: 'failed',
    amount: 85000,
    currency: 'TZS',
    reference: 'HOTEL_1704723660000_def456ghi',
    signature: 'test_signature_hash_2',
    timestamp: '2024-01-08T12:01:00Z'
  }
];

export const testEnvironmentVariables = {
  ZENOPAY_API_KEY: 'test_zp_sk_1234567890abcdef',
  ZENOPAY_MERCHANT_ID: 'merchant_test_12345',
  ZENOPAY_BASE_URL: 'https://api-sandbox.zenopay.com/v1',
  BACKEND_URL: 'http://localhost:5000'
};

export const mockZenoPayApiResponses = {
  initiatePayment: {
    success: {
      transactionId: 'ZP_TXN_' + Date.now(),
      paymentUrl: 'https://checkout-sandbox.zenopay.com/pay/test123',
      status: 'pending',
      message: 'Payment initiated successfully',
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    },
    error: {
      error: 'INVALID_AMOUNT',
      message: 'Amount must be greater than 1000 TZS',
      code: 'VALIDATION_ERROR'
    }
  },
  verifyPayment: {
    pending: {
      transactionId: 'ZP_TXN_1704723600000',
      status: 'pending',
      amount: 150000,
      currency: 'TZS',
      reference: 'HOTEL_1704723600000_abc123def',
      createdAt: '2024-01-08T12:00:00Z'
    },
    completed: {
      transactionId: 'ZP_TXN_1704723600000',
      status: 'completed',
      amount: 150000,
      currency: 'TZS',
      reference: 'HOTEL_1704723600000_abc123def',
      completedAt: '2024-01-08T12:05:00Z',
      paymentMethod: 'mobile_money',
      customerPhone: '+255712345678'
    },
    failed: {
      transactionId: 'ZP_TXN_1704723660000',
      status: 'failed',
      amount: 85000,
      currency: 'TZS',
      reference: 'HOTEL_1704723660000_def456ghi',
      failureReason: 'INSUFFICIENT_FUNDS',
      failedAt: '2024-01-08T12:02:00Z'
    }
  }
};
