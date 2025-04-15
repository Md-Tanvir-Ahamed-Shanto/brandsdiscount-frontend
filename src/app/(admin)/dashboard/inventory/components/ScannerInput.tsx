'use client';

import { useEffect, useRef } from 'react';

type ScannerInputProps = {
    onScan: (sku: string) => void;
    status: {
        message: string;
        type: 'info' | 'success' | 'error';
    };
};

const ScannerInput = ({ onScan, status }: ScannerInputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const value = e.currentTarget.value.trim();
            if (value) {
                onScan(value);
                e.currentTarget.value = '';
            }
        }
    };

    return (
        <div className='scan-input-wrapper'>
            <input
                type='text'
                ref={inputRef}
                onKeyDown={handleKeyDown}
                placeholder='Scan item or enter SKU...'
                className='sku-scan-input'
            />
            <div className={`scan-feedback ${status.type}`}>
                {status.message}
            </div>
        </div>
    );
};

export default ScannerInput;
