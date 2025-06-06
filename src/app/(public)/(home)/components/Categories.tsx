'use client';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
    {
        id: 1,
        title: 'Women',
        image: '/categories/women.png',
        link: '/shop/women'
    },
    {
        id: 2,
        title: 'Men',
        image: '/categories/men.png',
        link: '/shop?q=men'
    },
    {
        id: 3,
        title: 'Kids',
        image: '/categories/kids.png',
        link: '/shop?q=kids'
    }
];

const Categories = () => {
    return (
        <div className='bg-gray-100 py-16 mb-8'>
            <div className='container'>
                <h2 className='text-4xl font-bold text-center mb-12'>
                    Our Categories
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className='flex flex-col items-center'
                        >
                            <Link
                                href={category.link}
                                className='group relative block bg-white w-full'
                            >
                                <div className='aspect-square relative p-2 sm:p-3 md:p-4 border-2 sm:border-3 md:border-4 border-black transition-all duration-300 group-hover:ring-2 group-hover:ring-black/20 group-hover:shadow-md'>
                                    <Image
                                        src={category.image!}
                                        alt={category.title}
                                        fill
                                        className='object-cover p-1 sm:p-2'
                                    />
                                </div>
                            </Link>
                            <h3 className='text-base sm:text-lg md:text-xl font-medium mt-2 sm:mt-3 md:mt-4 text-center'>
                                {category.title}
                            </h3>
                        </div>
                    ))}

                    <div className='flex flex-col items-center justify-center'>
                        <Link
                            href='/shop'
                            className='bg-black rounded-full aspect-square w-full max-w-[12rem] sm:max-w-[14rem] md:max-w-[16rem] flex items-center justify-center ring-2 ring-black/20 shadow-md transition-all duration-300 hover:ring-4 hover:ring-black/30 hover:shadow-lg'
                        >
                            <span className='text-white text-xl sm:text-2xl md:text-3xl'>
                                View All
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
