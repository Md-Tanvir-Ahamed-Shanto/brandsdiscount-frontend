'use client';
import { useState } from 'react';
import { RECENT_VIEW } from '@/static';
import RecentViewSingleCard from './RecentViewSingleCard';

const RecentlyView = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <div className='container'>
            <div className='flex items-center justify-between mb-8'>
                <h3 className='font-bold text-2xl'>Recently viewed items</h3>
                <button
                    className='underline'
                    onClick={() => setIsEditMode(!isEditMode)}
                >
                    {isEditMode ? 'Done' : 'Edit'}
                </button>
            </div>
            <div className='grid grid-cols-12 gap-4 mb-24'>
                {RECENT_VIEW.map((product, index) => (
                    <RecentViewSingleCard
                        key={index}
                        {...product}
                        isEditMode={isEditMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentlyView;
