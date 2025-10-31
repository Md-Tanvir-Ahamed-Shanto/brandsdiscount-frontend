"use server";

import { redirect } from "next/navigation";
import { ISize } from '@/types/user';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dashboard.brandsdiscounts.com";

// Custom error class for checkout errors
class CheckoutError extends Error {
  constructor(message: string, public code?: string, public digest?: string) {
    super(message);
    this.name = 'CheckoutError';
    this.digest = digest;
  }
}

// Enhanced error logging for production
function logProductionError(error: unknown, context: string) {
  if (process.env.NODE_ENV === 'production') {
    console.error(`[PRODUCTION ERROR] ${context}:`, {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      digest: 'digest' in (error as object) ? (error as { digest: string }).digest : undefined,
      timestamp: new Date().toISOString(),
      context
    });
  }
}

// Helper function to safely handle redirects in production
function safeRedirect(url: string): never {
  try {
    // Validate URL before redirecting
    if (!url || typeof url !== 'string') {
      throw new CheckoutError('Invalid redirect URL', 'INVALID_URL');
    }
    
    // Ensure URL is properly formatted
    const validUrl = url.startsWith('http') ? url : `https://${url}`;
    redirect(validUrl);
  } catch (error) {
    logProductionError(error, 'safeRedirect');
    
    // In production, redirect might throw an error that needs to be handled
    if (error instanceof Error && 
        (error.message.includes('NEXT_REDIRECT') || 
         error.name === 'RedirectError' ||
         'digest' in error)) {
      // This is expected Next.js redirect behavior, re-throw
      throw error;
    }
    
    // For other errors, provide fallback
    throw new CheckoutError('Redirect failed', 'REDIRECT_ERROR');
  }
}

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

  try {
    // Validate required data
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new CheckoutError("Your cart is empty. Please add items to your cart before checkout.", "EMPTY_CART");
    }

    if (!finalAmount || finalAmount <= 0) {
      throw new CheckoutError("Invalid order amount. Please try again or contact support.", "INVALID_AMOUNT");
    }

    const requestBody = {
      cartItems,
      userId: userId || null,
      appliedPoints,
      shippingAddress: shippingAddress || null,
      billingAddress: billingAddress || null,
      finalAmount,
      customerEmail: customerEmail, // Pass the email as-is, let backend handle fallback
      ui_mode,
      metadata: {
        source: "frontend_checkout",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      }
    };

    // Add timeout for production reliability
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = "Failed to create checkout session";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If we can't parse the error response, use the default message
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new CheckoutError(errorMessage, `HTTP_${response.status}`);
    }

    const checkoutSession = await response.json();

    if (!checkoutSession.success) {
      throw new CheckoutError(checkoutSession.error || "Failed to create checkout session", "SESSION_FAILED");
    }

    if (ui_mode === "embedded") {
      return {
        client_secret: checkoutSession.client_secret,
        sessionId: checkoutSession.sessionId,
      };
    } else {
      // For hosted mode, redirect to Stripe checkout
      // Handle redirect properly for production environment
      if (!checkoutSession.url) {
        throw new CheckoutError("Invalid checkout URL received from server", "INVALID_URL");
      }
      
      try {
        safeRedirect(checkoutSession.url);
      } catch (redirectError) {
        logProductionError(redirectError, 'createCheckoutSession redirect');
        
        // If it's a NEXT_REDIRECT error, it's expected behavior
        if (redirectError instanceof Error && 
            (redirectError.message.includes('NEXT_REDIRECT') || 
             redirectError.name === 'RedirectError' ||
             'digest' in redirectError)) {
          throw redirectError; // Re-throw to allow Next.js to handle
        }
        
        // For other redirect errors, provide fallback
        console.error('Redirect failed, providing fallback:', redirectError);
        return {
          url: checkoutSession.url,
          sessionId: checkoutSession.sessionId,
          fallback: true
        };
      }
    }
  } catch (error) {
    logProductionError(error, 'createCheckoutSession');
    
    // Handle timeout errors
    if (error instanceof Error && error.name === 'AbortError') {
      throw new CheckoutError('Request timed out. Please check your connection and try again.', 'TIMEOUT');
    }
    
    // Handle network errors
    if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('network'))) {
      throw new CheckoutError('Network error. Please check your connection and try again.', 'NETWORK_ERROR');
    }
    
    // Re-throw CheckoutError instances
    if (error instanceof CheckoutError) {
      throw error;
    }
    
    // Handle unexpected errors
    throw new CheckoutError(
      process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred. Please try again or contact support.'
        : error instanceof Error ? error.message : 'Unknown error occurred',
      'UNEXPECTED_ERROR',
      'digest' in (error as object) ? (error as { digest: string }).digest : undefined
    );
  }
}

export async function getSessionStatus(sessionId: string) {
  // Validate sessionId
  if (!sessionId || typeof sessionId !== 'string') {
    throw new Error("Invalid session ID provided");
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/stripe/session-status/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add timeout for production reliability
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      let errorMessage = "Failed to get session status";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const sessionData = await response.json();

    if (!sessionData.success) {
      throw new Error(sessionData.error || "Failed to get session status");
    }

    // Ensure we have the required data
    if (!sessionData.session) {
      throw new Error("Invalid session data received from server");
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
    
    // Handle timeout errors specifically
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new Error("Request timed out. Please check your connection and try again.");
    }
    
    // Handle network errors
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error("Network error. Please check your connection and try again.");
    }
    
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
