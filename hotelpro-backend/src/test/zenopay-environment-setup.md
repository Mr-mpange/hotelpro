# ZenoPay Environment Setup Guide

## Required Environment Variables

Add these variables to your `.env` file in the backend root directory:

```env
# ZenoPay Configuration
ZENOPAY_API_KEY=your_zenopay_api_key_here
ZENOPAY_MERCHANT_ID=your_merchant_id_here
ZENOPAY_BASE_URL=https://api-sandbox.zenopay.com/v1

# Backend Configuration
BACKEND_URL=http://localhost:5000
PORT=5000

# Database Configuration (if not already set)
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=hotelpro_db
```

## Test Environment Variables

For testing purposes, you can use these sandbox values:

```env
ZENOPAY_API_KEY=test_zp_sk_1234567890abcdef
ZENOPAY_MERCHANT_ID=merchant_test_12345
ZENOPAY_BASE_URL=https://api-sandbox.zenopay.com/v1
BACKEND_URL=http://localhost:5000
```

## ZenoPay Account Setup

1. **Create ZenoPay Account**
   - Visit [ZenoPay Developer Portal](https://developer.zenopay.com)
   - Sign up for a developer account
   - Complete business verification

2. **Get API Credentials**
   - Navigate to API Keys section
   - Generate new API key for your application
   - Copy your Merchant ID from the dashboard

3. **Configure Webhooks**
   - Set webhook URL to: `http://your-domain.com/payments/webhook`
   - For local testing: `http://localhost:5000/payments/webhook`
   - Enable payment status events

## Testing the Integration

### 1. Start the Backend Server
```bash
cd hotelpro-backend
npm start
```

### 2. Test Payment Initiation
```bash
curl -X POST http://localhost:5000/payments/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "currency": "TZS",
    "customerEmail": "test@example.com",
    "customerPhone": "+255712345678",
    "description": "Test hotel booking"
  }'
```

### 3. Seed Test Data
Create a script to run the seed data:

```javascript
// run-seed.js
const { runSeedData } = require('./src/test/payment-seed-data');
runSeedData();
```

Then run: `node run-seed.js`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/initiate` | Initiate new payment |
| GET | `/payments/verify/:transactionId` | Verify payment status |
| POST | `/payments/webhook` | ZenoPay webhook handler |
| GET | `/payments/` | Get all payments |
| GET | `/payments/:id` | Get payment by ID |
| GET | `/payments/reference/:reference` | Get payment by reference |
| PUT | `/payments/:id/status` | Update payment status |

## Common Test Scenarios

### Successful Payment Flow
1. Initiate payment → Get payment URL
2. Customer completes payment on ZenoPay
3. Webhook updates payment status to 'completed'
4. Verify payment status via API

### Failed Payment Flow
1. Initiate payment → Get payment URL
2. Customer payment fails (insufficient funds, etc.)
3. Webhook updates payment status to 'failed'
4. Handle failed payment in your application

### Pending Payment Flow
1. Initiate payment → Get payment URL
2. Customer starts but doesn't complete payment
3. Status remains 'pending'
4. Optional: Set up timeout to handle abandoned payments

## Error Handling

The integration includes comprehensive error handling for:
- Invalid API credentials
- Network connectivity issues
- Invalid payment amounts
- Missing required fields
- Webhook signature validation
- Database connection errors

## Security Considerations

1. **Environment Variables**: Never commit API keys to version control
2. **Webhook Security**: Implement signature verification for webhooks
3. **HTTPS**: Use HTTPS in production for all API calls
4. **Input Validation**: Validate all payment data before processing
5. **Logging**: Log payment activities for audit purposes

## Production Deployment

When deploying to production:

1. Update `ZENOPAY_BASE_URL` to production endpoint
2. Use production API keys
3. Configure proper webhook URLs
4. Set up monitoring and alerting
5. Implement proper logging and error tracking
