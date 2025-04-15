import React from 'react';
import BarCode from './components/BarCode';
import Link from 'next/link';

const page = () => {
    return (
        <div>
            <Link
                href='/dashboard/inventory/one'
                className='bg-red-500 p-2 text-white'
            >
                Visit Second Bar Code Tester
            </Link>
            <Link
                href='/dashboard/inventory/two'
                className='bg-red-500 p-2 text-white'
            >
                Visit Third Bar Code Tester
            </Link>
            <BarCode />
        </div>
    );
};

export default page;
