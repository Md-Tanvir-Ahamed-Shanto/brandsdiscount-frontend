'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar({ initialQ }: { initialQ: string }) {
    const router = useRouter();
    const [query, setQuery] = useState(initialQ);

    // Sync with initialQ prop changes
    useEffect(() => {
        setQuery(initialQ);
    }, [initialQ]);

    // Debounce URL update
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams();

            if (query) {
                params.set('q', query);
            } else {
                params.delete('q');
            }
            params.set('page', '1'); // Reset to first page on search

            router.push(`/dashboard/products?${params.toString()}`);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [query, router]);

    return (
        <input
            type='text'
            placeholder='Search products via name'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='py-2 px-4 border rounded-lg mr-4 text-bgAdminText bg-bgAdmin'
        />
    );
}
