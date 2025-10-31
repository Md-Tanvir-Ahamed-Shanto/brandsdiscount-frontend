'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
}

class CheckoutErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Enhanced error logging for production
    const errorDetails = {
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        digest: 'digest' in error ? (error as { digest: string }).digest : undefined
      },
      errorInfo: {
        componentStack: errorInfo.componentStack
      },
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      retryCount: this.state.retryCount
    };

    console.error('CheckoutErrorBoundary caught an error:', errorDetails);

    // Log to production monitoring service
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      try {
        fetch('/api/log-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'checkout_error_boundary',
            ...errorDetails
          })
        }).catch(() => {
          // Silently fail if logging service is unavailable
        });
      } catch {
        // Silently fail if fetch is not available
      }
    }

    this.setState({
      error,
      errorInfo,
      hasError: true
    });
  }

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1
      }));
    } else {
      // Redirect to cart page after max retries
      if (typeof window !== 'undefined') {
        window.location.href = '/cart';
      }
    }
  };

  handleGoToCart = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/cart';
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isServerComponentError = this.state.error?.message?.includes('Server Components render');
      const canRetry = this.state.retryCount < this.maxRetries;

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Checkout Error
            </h1>
            
            <p className="text-gray-600 mb-6">
              {isServerComponentError 
                ? "We're experiencing a temporary server issue. This usually resolves quickly."
                : "Something went wrong during checkout. Don't worry, your cart items are safe."
              }
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-left">
                <p className="text-sm text-red-800 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {canRetry && (
                <button
                  onClick={this.handleRetry}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again ({this.maxRetries - this.state.retryCount} attempts left)
                </button>
              )}
              
              <button
                onClick={this.handleGoToCart}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Return to Cart
              </button>
            </div>

            {this.state.retryCount >= this.maxRetries && (
              <p className="mt-4 text-sm text-gray-500">
                If this problem persists, please contact our support team.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CheckoutErrorBoundary;