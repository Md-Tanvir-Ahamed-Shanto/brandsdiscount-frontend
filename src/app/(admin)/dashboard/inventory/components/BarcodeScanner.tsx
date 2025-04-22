'use client';
import { SCANDIT_KEY } from '@/config';
import React, { useEffect, useState } from 'react';
import { configure } from 'scandit-sdk';
import ProductList from './ProductList';

const BarcodeScanner = () => {
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [buffer, setBuffer] = useState('');
    const [lastKeyTime, setLastKeyTime] = useState(Date.now());
    const [scannedSkus, setScannedSkus] = useState<string[]>([]); //'ST2-005501', 'ST1-003943' Manage scanned SKUs dynamically

    // Initialize Scandit SDK (but don’t open camera)
    useEffect(() => {
        const setupScandit = async () => {
            try {
                await configure(SCANDIT_KEY, {
                    engineLocation:
                        'https://cdn.jsdelivr.net/npm/scandit-sdk/build/'
                });
                console.log('Scandit SDK loaded (camera not used)');
            } catch (error) {
                console.error('Scandit setup failed:', error);
            }
        };

        setupScandit();
    }, []);

    // Listen for keyboard-based scanning (hardware scanner)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const now = Date.now();

            // Reset buffer if delay is long
            if (now - lastKeyTime > 100) setBuffer('');

            if (e.key === 'Enter') {
                if (buffer) {
                    setScannedCode(buffer); // Set the scanned code
                    setScannedSkus((prev) => [...prev, buffer]); // Add the scanned SKU to the list
                }
                setBuffer(''); // Reset the buffer after each scan
            } else {
                setBuffer((prev) => prev + e.key); // Append the key to the buffer
            }

            setLastKeyTime(now);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [buffer, lastKeyTime]);

    return (
        <>
            <h3 className='text-3xl text-center mb-4'>
                Scandit Barcode Scanner SDK
            </h3>
            <div className='flex flex-col items-center'>
                <div className='text-xl font-semibold'>
                    {scannedCode
                        ? `✅ Scanned SKU: ${scannedCode}`
                        : '🔍 Waiting for scan...'}
                </div>

                <p className='mt-2 text-sm text-gray-500'>
                    Scanner ready. Just scan any code.
                </p>
            </div>
            <hr className='mt-6 rounded' />
            <ProductList initialScannedSkus={scannedSkus} />{' '}
            {/* Pass dynamic scannedSkus */}
        </>
    );
};

export default BarcodeScanner;
