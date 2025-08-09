/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MAX_RECENT_SEARCHES = 5;


const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('recentSearches');
        if (stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedSearch = searchTerm.trim();
        if (trimmedSearch) {
            // Add to recent searches
            const newRecentSearches = [trimmedSearch, ...recentSearches.filter(s => s !== trimmedSearch)]
                .slice(0, MAX_RECENT_SEARCHES);
            setRecentSearches(newRecentSearches);
            localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

            // Navigate to shop page with search query
            await router.push(`/shop?q=${encodeURIComponent(trimmedSearch)}`);
            setSearchTerm('');
            setIsFocused(false);
        }
    };
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

    const showSuggestions = (isHovering || isFocused) && recentSearches.length > 0;

    return (
        <div className='flex justify-center items-start w-full h-full lg:h-[70%]'>
            <div
                ref={containerRef}
                className='relative w-full max-w-3xl'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <form onSubmit={handleSearch} className='relative flex items-center'>
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
                        className='w-full py-2 pl-10 pr-20 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                    <div className='absolute right-3 flex items-center gap-2'>
                        {searchTerm && (
                            <button
                                type='button'
                                onClick={handleClear}
                                className='text-gray-500 hover:text-gray-700'
                                aria-label='Clear search'
                            >
                                <X size={20} />
                            </button>
                        )}
                        <button
                            type='submit'
                            className='text-gray-500 hover:text-gray-700'
                            aria-label='Search'
                        >
                            <Search size={20} />
                        </button>
                    </div>
                </form>

                {showSuggestions && (
                    <div className='absolute z-50 w-full mt-2 bg-white border rounded-lg shadow-lg'>
                        <div className='p-4'>
                            <h3 className='text-lg font-semibold mb-2'>Recent Searches</h3>
                            <ul className='space-y-2'>
                                {recentSearches.map((search) => (
                                    <div
                                        key={search}
                                        className='text-gray-600 hover:text-primary cursor-pointer block'
                                        onClick={() => {
                                            setSearchTerm(search);
                                            setIsFocused(false);
                                            router.push(`/shop?q=${encodeURIComponent(search)}`);
                                        }}
                                    >
                                        {search}
                                    </div>
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
