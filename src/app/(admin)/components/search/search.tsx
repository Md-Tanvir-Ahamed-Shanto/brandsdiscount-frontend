'use client';

import { MdSearch } from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';

interface SearchProps {
    placeholder: string;
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
    const [page, setPage] = useState('1');
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log(searchParams);
        const pageData = searchParams.get('page') || '1';

        setPage(pageData);
        console.log(page);
    }, [searchParams, page]);

    const handleSearch = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1');

            if (e.target.value.length > 2) {
                params.set('q', e.target.value);
            } else {
                params.delete('q');
            }

            replace(`${pathname}?${params.toString()}`);
        },
        300
    );

    return (
        <div className='flex items-center gap-2 bg-gray-800 p-3 rounded-lg w-max'>
            <MdSearch className='text-gray-400 text-xl' />
            <input
                type='text'
                placeholder={placeholder}
                className='bg-transparent border-none text-white outline-none placeholder-gray-400'
                onChange={handleSearch}
            />
        </div>
    );
};

export default Search;
