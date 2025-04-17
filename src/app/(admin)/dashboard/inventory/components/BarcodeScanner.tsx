/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { SCANDIT_KEY } from '@/config';
import React, { useEffect, useRef, useState } from 'react';
import {
    BarcodePicker,
    ScanResult,
    configure,
    ScanSettings
} from 'scandit-sdk';

const BarcodeScanner = () => {
    const scannerRef = useRef<HTMLDivElement>(null);
    const [barcodeData, setBarcodeData] = useState<string | null>(null);

    useEffect(() => {
        const startScanner = async () => {
            try {
                await configure(SCANDIT_KEY, {
                    engineLocation:
                        'https://cdn.jsdelivr.net/npm/scandit-sdk/build/'
                });

                const scanSettings = new ScanSettings({
                    // @ts-ignore: Unreachable code error
                    enabledSymbologies: ['code128', 'ean13', 'qr'],
                    codeDuplicateFilter: 1000
                });

                const picker = await BarcodePicker.create(scannerRef.current!, {
                    scanSettings,
                    playSoundOnScan: true,
                    vibrateOnScan: true
                });
                // @ts-ignore: Unreachable code error
                picker.onScan((result: ScanResult) => {
                    const scanned = result.barcodes[0];
                    if (scanned) {
                        setBarcodeData(scanned.data);
                    }
                });

                return () => {
                    picker.destroy();
                };
            } catch (err) {
                console.error('Failed to set up barcode picker:', err);
            }
        };

        startScanner();

        return () => {
            // Clean up when component unmounts
        };
    }, []);

    return (
        <div>
            <div ref={scannerRef} style={{ width: '100%', height: '400px' }} />
            {barcodeData && (
                <p className='mt-4 text-lg font-medium'>
                    📦 Scanned: <strong>{barcodeData}</strong>
                </p>
            )}
            <p>just conenct your device</p>
        </div>
    );
};

export default BarcodeScanner;
