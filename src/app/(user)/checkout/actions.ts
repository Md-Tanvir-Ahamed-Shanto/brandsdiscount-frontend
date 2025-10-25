"use server";

import { redirect } from "next/navigation";
import { ISize } from '@/types/user';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

interface CartItem {
  id: string;
  title: string;
  quantity: number;
  color?: string;
  size?: string | ISize;
  image?: string;
  regularPrice?: number;
  salePrice?: number;
  stockQuantity?: number;
  brandName?: string;
  // Allow additional properties with string keys and unknown values
  [key: string]: unknown;
}

interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface CheckoutSessionData {
  cartItems: CartItem[];
  userId?: string | null;
  appliedPoints?: number;
  shippingAddress?: Address | null;
  billingAddress?: Address | null;
  finalAmount: number;
  customerEmail?: string;
  ui_mode?: string;
}

export async function createCheckoutSession(data: CheckoutSessionData) {
  try {
    const {
      cartItems,
      userId,
      appliedPoints = 0,
      shippingAddress,
      billingAddress,
      finalAmount,
      customerEmail,
      ui_mode = "hosted"
    } = data;

    // Validate required data
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Cart items are required");
    }

    if (!finalAmount || finalAmount <= 0) {
      throw new Error("Valid final amount is required");
    }

    const requestBody = {
      cartItems,
      userId: userId || null,
      appliedPoints,
      shippingAddress: shippingAddress || null,
      billingAddress: billingAddress || null,
      finalAmount,
      customerEmail: customerEmail || null,
      ui_mode,
      metadata: {
        source: "frontend_checkout",
        timestamp: new Date().toISOString()
      }
    };

    const response = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create checkout session");
    }

    const checkoutSession = await response.json();

    if (!checkoutSession.success) {
      throw new Error(checkoutSession.error || "Failed to create checkout session");
    }

    if (ui_mode === "embedded") {
      return {
        client_secret: checkoutSession.client_secret,
        sessionId: checkoutSession.sessionId,
      };
    } else {
      redirect(checkoutSession.url);
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create checkout session. Please try again.");
  }
}

export async function getSessionStatus(sessionId: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/stripe/session-status/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get session status");
    }

    const sessionData = await response.json();

    if (!sessionData.success) {
      throw new Error(sessionData.error || "Failed to get session status");
    }

    return {
      status: sessionData.session.payment_status,
      customer_email: sessionData.session.customer_email,
      payment_status: sessionData.session.payment_status,
      amount_total: sessionData.session.amount_total,
      session: sessionData.session,
      dbSession: sessionData.dbSession
    };
  } catch (error) {
    console.error("Error getting session status:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to get session status. Please try again.");
  }
}

export async function processRefund(paymentIntentId: string, amount?: number, reason?: string) {
  try {
    const requestBody = {
      paymentIntentId,
      amount: amount || undefined, // Partial refund amount in dollars (will be converted to cents in backend)
      reason: reason || "requested_by_customer",
    };

    const response = await fetch(`${BACKEND_URL}/api/stripe/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to process refund");
    }

    const refundData = await response.json();

    if (!refundData.success) {
      throw new Error(refundData.error || "Failed to process refund");
    }

    return {
      success: true,
      refund: refundData.refund,
      message: "Refund processed successfully",
    };
  } catch (error) {
    console.error("Error processing refund:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to process refund. Please try again.");
  }
}
