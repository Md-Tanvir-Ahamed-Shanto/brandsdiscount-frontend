import React from 'react';
import BarcodeScanner from './components/BarcodeScanner';

const page = () => {
    return (
        <div className='container py-4'>
            <BarcodeScanner />
        </div>
    );
};

export default page;

{
    /* <Link
                href='/dashboard/inventory/zero'
                className='bg-red-500 p-2 text-white'
            >
                Visit One Bar Code Tester
            </Link>
            <Link
                href='/dashboard/inventory/one'
                className='bg-red-500 p-2 text-white mx-4'
            >
                Visit Second Bar Code Tester
            </Link>
            <Link
                href='/dashboard/inventory/two'
                className='bg-red-500 p-2 text-white'
            >
                Visit Third Bar Code Tester
            </Link> */
}
