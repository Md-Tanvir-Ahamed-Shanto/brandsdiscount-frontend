'use client';
import React, { Suspense } from 'react';
import { SuccessPageContent } from './components';

const page = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SuccessPageContent />
        </Suspense>
    );
};

export default page;
