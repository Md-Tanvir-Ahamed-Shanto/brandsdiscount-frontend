'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Checkout error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Checkout Error
        </h1>
        
        <p className="text-gray-600 mb-6">
          We encountered an issue while processing your checkout. This might be a temporary problem.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-left">
            <p className="text-sm text-red-800 font-mono">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-3">
          <Button 
            onClick={reset}
            className="w-full"
            variant="default"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/cart'}
            variant="outline"
            className="w-full"
          >
            Return to Cart
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-6">
          If this problem persists, please contact our support team.
        </p>
      </div>
    </div>
  )
}