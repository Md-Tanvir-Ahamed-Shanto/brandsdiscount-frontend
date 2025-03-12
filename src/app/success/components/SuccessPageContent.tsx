'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { getSessionStatus } from '@/app/checkout/actions';

const SuccessPageContent = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId) {
            const checkStatus = async () => {
                try {
                    const { status, session } =
                        await getSessionStatus(sessionId);
                    setStatus(status);
                    console.log('session', session);
                } catch (error) {
                    console.error('Error checking payment status:', error);
                } finally {
                    setLoading(false);
                }
            };

            checkStatus();
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    if (loading) {
        return (
            <div className='container mx-auto py-20 px-4 text-center'>
                <p className='text-xl'>Checking payment status...</p>
            </div>
        );
    }

    if (!sessionId || status !== 'paid') {
        return (
            <div className='container mx-auto py-20 px-4 text-center'>
                <h1 className='text-2xl font-bold mb-4'>Payment Incomplete</h1>
                <p className='mb-8'>
                    There was an issue with your payment or you canceled the
                    checkout.
                </p>
                <Button asChild>
                    <Link href='/'>Return to Shop</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className='container mx-auto py-20 px-4 text-center'>
            <div className='flex justify-center mb-6'>
                <CheckCircle className='h-16 w-16 text-green-500' />
            </div>
            <h1 className='text-3xl font-bold mb-4'>Payment Successful!</h1>
            <p className='text-xl mb-8'>
                Thank you for your purchase. Your order has been processed
                successfully.
            </p>
            <Button asChild>
                <Link href='/'>Continue Shopping</Link>
            </Button>
        </div>
    );
};

export default SuccessPageContent;
