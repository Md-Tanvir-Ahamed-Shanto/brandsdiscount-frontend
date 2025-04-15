'use client';

import { useEffect, useState } from 'react';

type Product = {
    sku: string;
    barcode: string; // 13-digit barcode
};

const products: Product[] = [
    {
        sku: 'ST1-016001',
        barcode: '8688493551573' // 13 digits from your product
    }
    // Add more products here if needed
];

export default function HomePage() {
    const [status, setStatus] = useState('Waiting for scan...');
    const [sku, setSku] = useState('');
    const [inputBuffer, setInputBuffer] = useState('');

    useEffect(() => {
        setStatus('Try to connect');

        const handleKeyDown = (e: KeyboardEvent) => {
            // If Enter is pressed, finalize scan
            if (e.key === 'Enter') {
                setStatus('✅ Scan Done');

                const matchedProduct = products.find(
                    (product) => product.barcode === inputBuffer
                );

                setSku(matchedProduct ? matchedProduct.sku : 'SKU Not Found');
                setInputBuffer(''); // reset buffer
                return;
            }

            // Accept only numbers
            if (/^[0-9]$/.test(e.key)) {
                setStatus('🔄 Scanning...');
                setInputBuffer((prev) => (prev + e.key).slice(-13)); // keep last 13 digits
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputBuffer]);

    return (
        <main className='p-8 max-w-xl mx-auto font-sans'>
            <h1 className='text-3xl font-bold mb-4'>POS Barcode Scanner</h1>

            <div className='mt-6 text-xl'>
                <div>
                    Status:{' '}
                    <span className='font-bold text-blue-600'>{status}</span>
                </div>
                <div className='mt-2'>
                    Scanned SKU:{' '}
                    <span className='font-bold text-green-600'>{sku}</span>
                </div>
            </div>
        </main>
    );
}
