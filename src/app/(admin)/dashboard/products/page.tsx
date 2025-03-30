/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import Pagination from '../../components/pagination/pagination';
import withSuspense from '../../components/suspense/withSuspense';
import AllProduct from './components/AllProduct';
import SearchBar from './components/SearchBar';

const SuspendedPagination = withSuspense(Pagination);

const ProductsPage = async ({
    searchParams
}: {
    searchParams: Promise<{ q: string; page: string }>;
}) => {
    const searchParamsData = await searchParams;
    const q = searchParamsData?.q || '';
    const page = searchParamsData?.page || '1';
    console.log(page);

    const count = 4;

    return (
        <div
            className='bg-bgAdmin-soft p-5 rounded-lg mt-5'
            suppressHydrationWarning
        >
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-lg font-light text-bgAdminText'>
                    Products
                </h1>
                <div className=''>
                    <SearchBar initialQ={q} />
                    <Link href='/dashboard/products/add'>
                        <button className='py-2 px-4 bg-indigo-600 text-white rounded-md cursor-pointer'>
                            Add New
                        </button>
                    </Link>
                </div>
            </div>
            <table className='w-full rounded-lg shadow-md'>
                <thead>
                    <tr>
                        <td className='p-3'>Product</td>
                        <td className='p-3'>Brand Name</td>
                        <td className='p-3'>Color</td>
                        <td className='p-3'>SKU</td>
                        <td className='p-3'>Item Location</td>
                        <td className='p-3'>Status</td>
                        <td className='p-3'>Action</td>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    <AllProduct page={page} searchKey={q} />
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;
