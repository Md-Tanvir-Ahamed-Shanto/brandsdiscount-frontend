/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import Pagination from '../../components/pagination/pagination';
import withSuspense from '../../components/suspense/withSuspense';
import AllOrder from './components/AllUsers';

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
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5 mx-6'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-lg font-light text-bgAdminText'>Order</h1>
            </div>
            <table className='w-full rounded-lg shadow-md'>
                <thead>
                    <tr>
                        <td className='p-3'>Order Id</td>
                        <td className='p-3'>Order Status</td>
                        <td className='p-3'>Transaction Id</td>
                        <td className='p-3'>Amount</td>
                        <td className='p-3'>Payment Status</td>
                        <td className='p-3'>Actions</td>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    <AllOrder page={page} />
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
