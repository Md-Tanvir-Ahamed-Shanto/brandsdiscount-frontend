import Image from 'next/image';
import Link from 'next/link';
import Search from '../../components/search/search';
import Pagination from '../../components/pagination/pagination';

const dummyProducts = [
    {
        id: '1',
        title: 'Product 1',
        desc: 'This is the first product',
        price: 29.99,
        createdAt: new Date().toDateString(),
        stock: 10,
        img: '/astronaut.png'
    },
    {
        id: '2',
        title: 'Product 2',
        desc: 'This is the second product',
        price: 49.99,
        createdAt: new Date().toDateString(),
        stock: 5,
        img: '/astronaut.png'
    },
    {
        id: '3',
        title: 'Product 3',
        desc: 'This is the third product',
        price: 19.99,
        createdAt: new Date().toDateString(),
        stock: 15,
        img: '/astronaut.png'
    }
];

const ProductsPage = async ({
    searchParams
}: {
    searchParams: Promise<{ q: string; page: string }>;
}) => {
    const searchParamsData = await searchParams;
    const q = searchParamsData?.q || '';
    const page = searchParamsData?.page || '1';
    console.log(q);

    const count = dummyProducts.length;

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
            {/* Search and Add Button */}
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-lg font-light text-bgAdminText'>
                    Products
                </h1>
                <Link href='/dashboard/products/add'>
                    <button className='px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer'>
                        Add New
                    </button>
                </Link>
            </div>

            {/* Product Table */}
            <table className='w-full rounded-lg shadow-md'>
                <thead>
                    <tr>
                        <td className='p-3'>Title</td>
                        <td className='p-3'>Description</td>
                        <td className='p-3'>Price</td>
                        <td className='p-3'>Created At</td>
                        <td className='p-3'>Stock</td>
                        <td className='p-3'>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {dummyProducts.map((product) => (
                        <tr key={product.id} className='border-b'>
                            <td className='p-3 flex items-center gap-3'>
                                <Image
                                    src={product.img}
                                    alt={product.title}
                                    width={40}
                                    height={40}
                                    className='rounded-full object-cover'
                                />
                                {product.title}
                            </td>
                            <td className='p-3'>{product.desc}</td>
                            <td className='p-3'>${product.price}</td>
                            <td className='p-3'>{product.createdAt}</td>
                            <td className='p-3'>{product.stock}</td>
                            <td className='p-3 flex gap-2'>
                                <Link
                                    href={`/dashboard/products/${product.id}`}
                                >
                                    <button className='px-3 py-1 bg-teal-500 text-white rounded'>
                                        View
                                    </button>
                                </Link>
                                <form method='POST'>
                                    <input
                                        type='hidden'
                                        name='id'
                                        value={product.id}
                                    />
                                    <button
                                        className='px-3 py-1 bg-red-500 text-white rounded'
                                        type='submit'
                                    >
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <Pagination count={count} />
        </div>
    );
};

export default ProductsPage;
