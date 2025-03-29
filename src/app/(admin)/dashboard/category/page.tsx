/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import Pagination from '../../components/pagination/pagination';
import withSuspense from '../../components/suspense/withSuspense';
import AllUsers from './components/AllUsers';

const SuspendedPagination = withSuspense(Pagination);

const UsersPage = async ({
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
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-lg font-light text-bgAdminText'>
                    Category
                </h1>
                <Link href='/dashboard/category/add'>
                    <button className='py-2 px-4 bg-indigo-600 text-white rounded-md cursor-pointer'>
                        Add New
                    </button>
                </Link>
            </div>
            <table className='w-full rounded-lg shadow-md'>
                <thead>
                    <tr>
                        <td className='p-3'>Name</td>
                        <td className='p-3'>Actions</td>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    <AllUsers page={page} />
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
