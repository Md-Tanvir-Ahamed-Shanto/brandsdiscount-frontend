'use client';
import React, { Suspense } from 'react';
import { SuccessPageContent } from './components';
import ErrorBoundary from './components/ErrorBoundary';

const page = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={
                <div className="container mx-auto py-20 px-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl">Loading payment status... Please wait.</p>
                    <p className="text-sm text-gray-500 mt-2">Do not reload the page.</p>
                </div>
            }>
                <SuccessPageContent />
            </Suspense>
        </ErrorBoundary>
    );
};

export default page;
