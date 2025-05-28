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
        <div className='bg-gray-100 py-16'>
            <div className='container'>
                <h2 className='text-4xl font-bold text-center mb-12'>
                    Our Categories
                </h2>
                <div className='grid grid-cols-4 gap-8'>
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className='flex flex-col items-center'
                        >
                            <Link
                                href={category.link}
                                className='group relative block bg-white'
                            >
                                <div className='h-72 w-72 relative p-4 border-4 border-black transition-all duration-300 group-hover:ring-2 group-hover:ring-black/20 group-hover:shadow-md'>
                                    <Image
                                        src={category.image!}
                                        alt={category.title}
                                        fill
                                        className='object-cover p-2'
                                    />
                                </div>
                            </Link>
                            <h3 className='text-xl font-medium mt-4 text-center'>
                                {category.title}
                            </h3>
                        </div>
                    ))}

                    <div className='flex flex-col items-start justify-center'>
                        <Link
                            href='/shop'
                            className='bg-black rounded-full h-48 w-48 flex items-center justify-center ring-2 ring-black/20 shadow-md transition-all duration-300 hover:ring-4 hover:ring-black/30 hover:shadow-lg'
                        >
                            <span className='text-white text-3xl'>
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
