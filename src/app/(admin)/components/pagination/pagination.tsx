'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PaginationProps {
    count: number;
}

const Pagination: React.FC<PaginationProps> = ({ count }) => {
    const [page, setPage] = useState('1');
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log(searchParams);
        const page = searchParams.get('page') || '1';

        setPage(page);
    }, [searchParams]);

    const ITEM_PER_PAGE = 6;

    const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
    const hasNext =
        ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

    const handleChangePage = (type: 'prev' | 'next') => {
        const params = new URLSearchParams(searchParams);

        if (type === 'prev') {
            params.set('page', (parseInt(page) - 1).toString());
        } else {
            params.set('page', (parseInt(page) + 1).toString());
        }

        replace(`${pathname}?${params}`);
    };

    return (
        <span className='p-2 flex justify-between mt-4 w-full'>
            <button
                className='px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed'
                disabled={!hasPrev}
                onClick={() => handleChangePage('prev')}
            >
                Previous
            </button>
            <button
                className='px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed'
                disabled={!hasNext}
                onClick={() => handleChangePage('next')}
            >
                Next
            </button>
        </span>
    );
};

export default Pagination;
