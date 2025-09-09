import { Router } from "express";
import { Payment } from "../models/Payment";
import ZenoPayService from "../services/ZenoPayService";

const router = Router();

// Initiate ZenoPay Payment
router.post("/initiate", async (req, res) => {
  try {
    const {
      amount,
      currency = 'TZS',
      customerEmail,
      customerPhone,
      description,
      bookingId
    } = req.body;

    if (!amount || !customerEmail) {
      return res.status(400).json({ 
        error: "Amount and customer email are required" 
      });
    }

    // Generate unique reference
    const reference = `HOTEL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create payment record in database
    const payment = await Payment.create({
      amount,
      currency,
      method: 'zenopay',
      status: 'pending',
      reference,
      customerEmail,
      customerPhone,
      description,
      bookingId
    });

    // Initiate payment with ZenoPay
    const zenoPayResponse = await ZenoPayService.initiatePayment({
      amount,
      currency,
      reference,
      description: description || `Hotel booking payment - ${reference}`,
      customerEmail,
      customerPhone,
      callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}/payments/webhook`
    });

    if (zenoPayResponse.success) {
      // Update payment with transaction ID and payment URL
      await payment.update({
        transactionId: zenoPayResponse.transactionId,
        paymentUrl: zenoPayResponse.paymentUrl
      });

      res.status(201).json({
        success: true,
        paymentId: payment.get('id'),
        transactionId: zenoPayResponse.transactionId,
        paymentUrl: zenoPayResponse.paymentUrl,
        reference,
        message: "Payment initiated successfully"
      });
    } else {
      // Update payment status to failed
      await payment.update({ status: 'failed' });
      
      res.status(400).json({
        success: false,
        error: zenoPayResponse.message
      });
    }
  } catch (err) {
    console.error('Payment initiation error:', err);
    res.status(500).json({ error: (err as Error).message });
  }
});

// Verify ZenoPay Payment
router.get("/verify/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Find payment in database
    const payment = await Payment.findOne({ where: { transactionId } });
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // Verify with ZenoPay
    const verification = await ZenoPayService.verifyPayment(transactionId);

    if (verification.success) {
      // Update payment status
      await payment.update({ status: verification.status });

      res.json({
        success: true,
        payment: {
          id: payment.get('id'),
          transactionId,
          status: verification.status,
          amount: verification.amount,
          currency: verification.currency,
          reference: verification.reference
        }
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Payment verification failed"
      });
    }
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ error: (err as Error).message });
  }
});

// ZenoPay Webhook Handler
router.post("/webhook", async (req, res) => {
  try {
    const webhookData = req.body;
    
    // Process webhook with ZenoPay service
    const isValid = await ZenoPayService.handleWebhook(webhookData);
    
    if (isValid && webhookData.transactionId) {
      // Find and update payment
      const payment = await Payment.findOne({ 
        where: { transactionId: webhookData.transactionId } 
      });
      
      if (payment) {
        await payment.update({ 
          status: webhookData.status || 'completed' 
        });
      }
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// READ all Payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// READ single Payment
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get Payment by Reference
router.get("/reference/:reference", async (req, res) => {
  try {
    const payment = await Payment.findOne({ 
      where: { reference: req.params.reference } 
    });
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// UPDATE Payment Status (for admin use)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    
    await payment.update({ status });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
