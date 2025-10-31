'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Success page error boundary caught an error:', error, errorInfo);
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // You can add error reporting service here
      console.error('Production error in success page:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        digest: 'digest' in error ? (error as { digest: string }).digest : undefined,
      });
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} retry={this.retry} />;
      }

      return (
        <div className="container mx-auto py-20 px-4 text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="text-xl mb-4 text-gray-600">
            We encountered an error while processing your payment status.
          </p>
          <p className="text-lg mb-8 text-gray-500">
            Don&apos;t worry - if your payment was successful, your order is being processed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={this.retry} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button asChild>
              <Link href="/">Return to Shop</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/orders">View Orders</Link>
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-8 text-left bg-gray-100 p-4 rounded">
              <summary className="cursor-pointer font-semibold">Error Details (Development)</summary>
              <pre className="mt-2 text-sm overflow-auto">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;