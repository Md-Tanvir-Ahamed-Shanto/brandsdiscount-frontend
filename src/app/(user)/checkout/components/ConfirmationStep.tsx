'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { FormData } from '../page';

type ConfirmationStepProps = {
    formData: FormData;
    onBack: () => void;
};

export function ConfirmationStep({ formData, onBack }: ConfirmationStepProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = () => {
        setIsLoading(true);
        // Simulate processing
        setTimeout(() => {
            alert('Order submitted successfully!');
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className='space-y-6'>
            <div className='bg-gray-50 p-4 rounded-lg'>
                <h2 className='font-semibold text-lg mb-3'>Order Summary</h2>
                <div className='space-y-2'>
                    <p>
                        <span className='font-medium'>Name:</span>{' '}
                        {formData.fullName}
                    </p>
                    <p>
                        <span className='font-medium'>Email:</span>{' '}
                        {formData.email}
                    </p>
                    <p>
                        <span className='font-medium'>Phone:</span>{' '}
                        {formData.phone}
                    </p>
                    <p>
                        <span className='font-medium'>Address:</span>{' '}
                        {formData.address1}
                    </p>
                    {formData.address2 && (
                        <p>
                            <span className='font-medium'>Address 2:</span>{' '}
                            {formData.address2}
                        </p>
                    )}
                    <p>
                        <span className='font-medium'>Country:</span>{' '}
                        {formData.country}
                    </p>
                    <p>
                        <span className='font-medium'>Postal Code:</span>{' '}
                        {formData.postalCode}
                    </p>
                </div>
                <div className='mt-4 pt-4 border-t'>
                    <div className='flex justify-between font-semibold'>
                        <span>Total:</span>
                        <span>$99.99</span>
                    </div>
                </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg'>
                <p className='text-gray-700'>
                    Thank you for your order! Please review your information
                    above and click the button below to complete your purchase.
                </p>
            </div>

            <div className='flex flex-col gap-3'>
                <Button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className='w-full'
                >
                    {isLoading ? 'Processing...' : 'Complete Order'}
                </Button>
                <Button variant='outline' onClick={onBack} className='w-full'>
                    Back to Details
                </Button>
            </div>
        </div>
    );
}
