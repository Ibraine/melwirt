import axiosInstance from "./axiosConfig"; // global axios with token

const BASE = "/api/payments/"; // backend base for payments

// ================================== CREATE ORDER ==================================
export const createPaymentOrder = async (payload) => {
  // payload example: { course: 1, amount: 5000 }
  try {
    const res = await axiosInstance.post(BASE + "create-order/", payload);
    return res.data;
  } catch (err) {
    console.error("Error creating payment order:", err);
    throw err;
  }
};

// ================================== VERIFY PAYMENT ==================================
export const verifyPayment = async (payload) => {
  // payload example: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
  try {
    const res = await axiosInstance.post(BASE + "verify-payment/", payload);
    return res.data;
  } catch (err) {
    console.error("Error verifying payment:", err);
    throw err;
  }
};

// ================================== WEBHOOK (optional) ==================================
// Usually backend only; frontend rarely calls this
export const razorpayWebhook = async (payload) => {
  try {
    const res = await axiosInstance.post(BASE + "webhook/", payload);
    return res.data;
  } catch (err) {
    console.error("Webhook error:", err);
    throw err;
  }
};
