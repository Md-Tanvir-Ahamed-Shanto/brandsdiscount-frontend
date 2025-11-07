'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Unauthorized</h2>
          <p className="text-gray-600 mb-8">
            You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          <div className="space-y-4">
            <Button 
              onClick={() => router.push('/auth/login')} 
              className="w-full"
            >
              Go to Login
            </Button>
            <Button 
              onClick={() => router.push('/')} 
              variant="outline"
              className="w-full"
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}