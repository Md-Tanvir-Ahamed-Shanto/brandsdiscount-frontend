/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import ScannerInput from '../components/ScannerInput';

type Item = {
    sku: string;
    id: string;
    post_title: string;
    sale_price: number | string;
    name?: string;
    price?: string | number;
};

const Inventory = () => {
    const [status, setStatus] = useState({
        message: 'Ready to scan...',
        type: 'info' as 'info' | 'success' | 'error'
    });
    const [items, setItems] = useState<Item[]>([]);
    const [total, setTotal] = useState<number>(0);

    const formatPrice = (price: number | string) =>
        `$${Number(price).toFixed(2)}`;

    const handleScan = async (sku: string) => {
        setStatus({ message: 'Processing...', type: 'info' });

        try {
            const res = await fetch('/api/pos/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sku })
            });

            if (!res.ok) throw new Error('Scan failed');

            const item = await res.json();
            setItems((prev) => [...prev, item]);
            setTotal((prev) => prev + parseFloat(item.sale_price));
            setStatus({
                message: `Added: ${item.post_title}`,
                type: 'success'
            });
        } catch (err) {
            console.error(err);
            setStatus({
                message: 'Item not found or error occurred',
                type: 'error'
            });
        }
    };

    const handleRemove = (index: number) => {
        const removedItem = items[index];
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        setTotal((prev) => prev - parseFloat(removedItem.sale_price as any));
        setStatus({
            message: `Removed: ${removedItem.post_title}`,
            type: 'info'
        });
    };

    const handleClear = () => {
        setItems([]);
        setTotal(0);
        setStatus({ message: 'All items cleared', type: 'info' });
    };

    return (
        <div className='pos-container'>
            <h2>Point of Sale - Scan Items</h2>

            <ScannerInput onScan={handleScan} status={status} />

            <div className='scanned-items-section'>
                <h3>Current Transaction Items</h3>
                <div className='items-list-container'>
                    {items.length === 0 ? (
                        <p className='empty-list-msg'>No items scanned yet.</p>
                    ) : (
                        items.map((item, index) => (
                            <div key={index} className='scanned-item'>
                                <div className='item-details'>
                                    <span>[{item.sku}]</span>
                                    <span>[{item.id}]</span>
                                    <span>{item.post_title}</span>
                                </div>
                                <span className='item-price'>
                                    {formatPrice(item.sale_price)}
                                </span>
                                <button
                                    className='remove-item-btn'
                                    onClick={() => handleRemove(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div id='transaction-summary'>
                    <strong>Total: {formatPrice(total)}</strong>
                </div>
            </div>

            <div className='transaction-controls'>
                <button onClick={handleClear} className='btn btn-warning'>
                    Clear All Items
                </button>
                <button className='btn btn-success'>Complete Sale</button>
            </div>

            <hr />
        </div>
    );
};

export default Inventory;
