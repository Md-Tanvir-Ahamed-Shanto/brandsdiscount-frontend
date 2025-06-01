'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { selectCartSubtotal, useAppSelector } from '@/store';

interface ProgressBarProps {
    targetSpend: number;
    initialTimeInSeconds?: number;
    onTimeExpire?: () => void;
    className?: string;
}

const ProgressBar = ({
    targetSpend,
    initialTimeInSeconds = 3599,
    onTimeExpire,
    className = ''
}: ProgressBarProps) => {
    const subtotal = useAppSelector(selectCartSubtotal);
    const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);
    const amountStillNeeded = Math.max(0, targetSpend - subtotal);
    const progressPercentage = Math.min(100, (subtotal / targetSpend) * 100);
    const isCompleted = subtotal >= targetSpend;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    onTimeExpire?.();
                    return initialTimeInSeconds;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [initialTimeInSeconds, onTimeExpire]);

    return (
        <div className='mx-2'>
            <div
                className={clsx(
                    'bg-white border text-gray-700 p-5 rounded-lg shadow-md text-center',
                    'max-w-5xl mx-auto mt-2',
                    isCompleted ? 'border-green-300' : 'border-gray-300',
                    className
                )}
            >
                <p
                    className={clsx(
                        'font-semibold text-lg',
                        isCompleted ? 'text-green-700' : 'text-gray-800'
                    )}
                >
                    {isCompleted
                        ? "Congratulations! You've unlocked your $10 item!"
                        : "You're almost there!"}
                </p>

                <p className='text-sm text-gray-600 mb-1'>
                    {isCompleted ? (
                        'Your first item discount is secured. Happy shopping!'
                    ) : (
                        <>
                            Your $10 item is in your bag. Spend{' '}
                            <strong className='text-red-600'>
                                ${amountStillNeeded.toFixed(2)} more
                            </strong>{' '}
                            to reach ${targetSpend} and lock in the deal!
                        </>
                    )}
                </p>

                <div className='bg-gray-200 rounded-md overflow-hidden h-7 mt-3 mb-2'>
                    <div
                        className={clsx(
                            'h-full transition-all duration-600 flex items-center justify-center text-sm font-semibold text-white',
                            isCompleted ? 'bg-green-500' : 'bg-red-600'
                        )}
                        style={{ width: `${progressPercentage}%` }}
                    >
                        {Math.round(progressPercentage)}%
                    </div>
                </div>

                <p className='text-sm text-gray-600'>
                    Current eligible total:{' '}
                    <strong className='text-gray-800'>
                        ${subtotal.toFixed(2)}
                    </strong>{' '}
                    / ${targetSpend.toFixed(2)}
                </p>

                <p className='text-sm text-gray-600 mt-3 font-medium'>
                    Offer opportunity refreshes in:{' '}
                    <span className='font-bold text-red-600'>
                        {formatTime(timeRemaining)}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ProgressBar;
