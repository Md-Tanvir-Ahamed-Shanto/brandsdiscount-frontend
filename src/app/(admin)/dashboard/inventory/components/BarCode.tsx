/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

export default function BarCode() {
    const [barcode, setBarcode] = useState<any>('');
    const [scannedCode, setScannedCode] = useState('');
    const [productInfo, setProductInfo] = useState<any>(null);

    useEffect(() => {
        let buffer = '';
        let timeout: NodeJS.Timeout;

        const handleKeyPress = (e: KeyboardEvent) => {
            // If Enter is pressed
            if (e.key === 'Enter') {
                setScannedCode(buffer);
                setBarcode(buffer);
                fetchProductDetails(buffer); // Optional
                buffer = '';
                return;
            }

            buffer += e.key;

            // reset if no activity in 500ms (in case of random typing)
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                buffer = '';
            }, 500);
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const fetchProductDetails = async ({ code, id }: any) => {
        // You can replace this with an actual API call
        const dummyProduct = {
            sku: code,
            id: id
        };

        setProductInfo(dummyProduct);
    };

    return (
        <main className='flex flex-col items-center justify-center p-4'>
            <h1 className='text-2xl font-bold mb-4'>
                {(barcode?.id as any) || (barcode?.sku as any)}
            </h1>

            <div className='text-lg mb-2'>
                <strong>Scanned Code:</strong> {scannedCode || 'Waiting...'}
            </div>

            {productInfo && (
                <div className='mt-4 p-4 border rounded shadow'>
                    <p>
                        <strong>SKU:</strong> {productInfo.sku}
                    </p>
                    <p>
                        <strong>Id:</strong> {productInfo.id}
                    </p>
                </div>
            )}
        </main>
    );
}
