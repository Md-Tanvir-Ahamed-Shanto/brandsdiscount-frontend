'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    count: number;
}

const Pagination: React.FC<PaginationProps> = ({ count }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const page = searchParams.get('page') || '1';
    const ITEM_PER_PAGE = 2;

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
        <div className='p-2 flex justify-between'>
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
        </div>
    );
};

export default Pagination;
