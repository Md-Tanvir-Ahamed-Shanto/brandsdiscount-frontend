/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/lib';
import { useGetAllSearchProductQuery } from '@/api/public';
import Link from 'next/link';

const topSearches = [
    'women dresses',
    'polo ralph lauren men',
    'women perfume',
    'women shoes',
    'coach handbags',
    'prom dresses',
    'men cologne',
    'luggage sets'
];

const SearchComponent = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Custom debounce hook
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: searchResults } = useGetAllSearchProductQuery(
        debouncedSearchTerm,
        {
            skip: !debouncedSearchTerm // prevent empty search
        }
    ) as any;

    // Log the debounced search term to console
    useEffect(() => {
        if (debouncedSearchTerm) {
            console.log('Search term:', debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    // Handle click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClear = () => {
        setSearchTerm('');
        setIsFocused(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const showSuggestions = (isHovering || isFocused) && topSearches.length > 0;

    return (
        <div className='flex justify-center items-start w-full h-full lg:h-[70%]'>
            <div
                ref={containerRef}
                className='relative w-full max-w-3xl'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className='relative flex items-center'>
                    <div className='absolute left-3 text-gray-500'>
                        <Search size={20} />
                    </div>
                    <input
                        ref={inputRef}
                        type='text'
                        placeholder='Search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        className='w-full py-2 pl-10 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                    {searchTerm && (
                        <button
                            onClick={handleClear}
                            className='absolute right-3 text-gray-500 hover:text-gray-700'
                            aria-label='Clear search'
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {showSuggestions && (
                    <div className='absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg'>
                        <div className='p-4'>
                            <h3 className='text-lg font-semibold mb-2'>
                                {searchResults?.length
                                    ? 'Searches Product'
                                    : 'No Product Found'}
                            </h3>
                            <ul className='space-y-2'>
                                {searchResults
                                    ?.slice(0, 10)
                                    .map(({ title, id }: any) => (
                                        <Link
                                            href={`/shop/${id}`}
                                            key={id}
                                            className='text-gray-600 hover:text-primary cursor-pointer block'
                                            onClick={() => {
                                                setSearchTerm(title);
                                                console.log('Selected:', title);
                                            }}
                                        >
                                            {title}
                                        </Link>
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
