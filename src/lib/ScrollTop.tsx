'use client';
import ScrollToTop from 'react-scroll-to-top';
import React from 'react';
import { Icons } from '@/components';

const ScrollTop = () => {
    return (
        <ScrollToTop
            smooth
            component={<Icons.ChevronUp />}
            className='!bg-white rounded !w-9 !h-9 border !border-black flex items-center justify-center'
        />
    );
};

export default ScrollTop;
