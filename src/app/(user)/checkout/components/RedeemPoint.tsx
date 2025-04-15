import React, { useState } from 'react';
import { useUserDetails } from '@/lib';
import {
    getDiscountedSubtotal,
    selectCartSubtotal,
    setAppliedPointsFromStore,
    setFinalAmount,
    useAppDispatch,
    useAppSelector
} from '@/store';

const RedeemPoint = () => {
    const { user } = useUserDetails();

    const dispatch = useAppDispatch();
    const subtotal = useAppSelector(selectCartSubtotal);
    const redeemPoint = useAppSelector((state) => state.cart.appliedPoints);

    const [redeemInput, setRedeemInput] = useState('');

    const [appliedPoints, setAppliedPoints] = useState(0);
    const [error, setError] = useState('');

    const handleApplyRedeem = () => {
        const points = parseInt(redeemInput);
        if (isNaN(points) || points < 0) {
            setError('Redeem points must be 0 or a positive number');
            setAppliedPoints(0);
            dispatch(setFinalAmount(subtotal));
        } else if (user?.orderPoint !== undefined && points > user.orderPoint) {
            setError('You cannot redeem more points than you have');
            setAppliedPoints(0);
            dispatch(setFinalAmount(subtotal));
        } else {
            setAppliedPoints(points);
            setError('');
            const discount = points * 0.01;
            dispatch(setFinalAmount(getDiscountedSubtotal(subtotal, discount)));
            dispatch(setAppliedPointsFromStore(points));
        }
    };

    const discount = appliedPoints * 0.01;
    const finalAmount = getDiscountedSubtotal(subtotal, discount);

    return (
        <div className='space-y-4'>
            <div className='text-lg font-semibold flex gap-4 items-center'>
                Your Redeem Points:
                <span className=''>{user?.orderPoint || 0}</span>{' '}
                <div className='text-sm text-gray-500'>
                    <span>(100 points = $1.00)</span>
                </div>
            </div>

            <div className='flex gap-2 items-center'>
                <input
                    type='number'
                    min='0'
                    className='border px-3 py-2 rounded w-48'
                    placeholder='Enter redeem points'
                    value={redeemInput}
                    onChange={(e) => setRedeemInput(e.target.value)}
                />
                <button
                    onClick={handleApplyRedeem}
                    className='bg-[#272e3f] text-white px-4 py-2 rounded hover:bg-[#272e3f]/80'
                >
                    Use Redeem Points
                </button>
            </div>

            {redeemPoint ? (
                <div className='text-sm font-light flex gap-4 items-center'>
                    After Use Your Remain Redeem Point will:
                    <span className=''>
                        {user?.orderPoint - redeemPoint}
                    </span>{' '}
                </div>
            ) : (
                ''
            )}

            {error && <div className='text-red-500 text-sm'>{error}</div>}

            <div className='flex justify-between font-medium text-lg border-t pt-4 mt-4'>
                <span>Total Payable Amount</span>
                <span>
                    {appliedPoints > 0 ? (
                        <>
                            <span className='line-through text-gray-500 mr-2'>
                                ${subtotal.toFixed(2)}
                            </span>
                            <span className='text-green-600'>
                                ${finalAmount.toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span>${subtotal.toFixed(2)}</span>
                    )}
                </span>
            </div>
        </div>
    );
};

export default RedeemPoint;
