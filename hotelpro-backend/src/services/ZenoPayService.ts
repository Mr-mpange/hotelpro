import axios from 'axios';

export interface ZenoPayPaymentRequest {
  amount: number;
  currency: string;
  reference: string;
  description: string;
  customerEmail: string;
  customerPhone: string;
  callbackUrl?: string;
}

export interface ZenoPayPaymentResponse {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  status: 'pending' | 'completed' | 'failed';
  message: string;
}

export interface ZenoPayVerificationResponse {
  success: boolean;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  currency: string;
  reference: string;
}

class ZenoPayService {
  private apiKey: string;
  private baseUrl: string;
  private merchantId: string;

  constructor() {
    this.apiKey = process.env.ZENOPAY_API_KEY || '';
    this.baseUrl = process.env.ZENOPAY_BASE_URL || 'https://api.zenopay.com/v1';
    this.merchantId = process.env.ZENOPAY_MERCHANT_ID || '';

    if (!this.apiKey || !this.merchantId) {
      throw new Error('ZenoPay API key and Merchant ID are required. Please set ZENOPAY_API_KEY and ZENOPAY_MERCHANT_ID in your environment variables.');
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-Merchant-ID': this.merchantId
    };
  }

  async initiatePayment(paymentData: ZenoPayPaymentRequest): Promise<ZenoPayPaymentResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/payments/initiate`,
        {
          ...paymentData,
          merchantId: this.merchantId
        },
        {
          headers: this.getHeaders()
        }
      );

      return {
        success: true,
        transactionId: response.data.transactionId,
        paymentUrl: response.data.paymentUrl,
        status: response.data.status || 'pending',
        message: response.data.message || 'Payment initiated successfully'
      };
    } catch (error: any) {
      console.error('ZenoPay payment initiation error:', error.response?.data || error.message);
      
      return {
        success: false,
        transactionId: '',
        status: 'failed',
        message: error.response?.data?.message || 'Payment initiation failed'
      };
    }
  }

  async verifyPayment(transactionId: string): Promise<ZenoPayVerificationResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/payments/verify/${transactionId}`,
        {
          headers: this.getHeaders()
        }
      );

      return {
        success: true,
        transactionId: response.data.transactionId,
        status: response.data.status,
        amount: response.data.amount,
        currency: response.data.currency,
        reference: response.data.reference
      };
    } catch (error: any) {
      console.error('ZenoPay payment verification error:', error.response?.data || error.message);
      
      return {
        success: false,
        transactionId,
        status: 'failed',
        amount: 0,
        currency: '',
        reference: ''
      };
    }
  }

  async getPaymentStatus(transactionId: string): Promise<'pending' | 'completed' | 'failed'> {
    try {
      const verification = await this.verifyPayment(transactionId);
      return verification.status;
    } catch (error) {
      console.error('Error getting payment status:', error);
      return 'failed';
    }
  }

  async handleWebhook(webhookData: any): Promise<boolean> {
    try {
      // Verify webhook signature if ZenoPay provides one
      const signature = webhookData.signature;
      const expectedSignature = this.generateWebhookSignature(webhookData);
      
      if (signature && signature !== expectedSignature) {
        console.error('Invalid webhook signature');
        return false;
      }

      // Process webhook data
      console.log('ZenoPay webhook received:', webhookData);
      return true;
    } catch (error) {
      console.error('Webhook processing error:', error);
      return false;
    }
  }

  private generateWebhookSignature(data: any): string {
    // Implement signature generation based on ZenoPay's webhook security
    // This is a placeholder - replace with actual ZenoPay signature logic
    return '';
  }
}

export default new ZenoPayService();
