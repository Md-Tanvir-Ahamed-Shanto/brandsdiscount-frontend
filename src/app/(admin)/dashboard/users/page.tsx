import Image from 'next/image';
import Link from 'next/link';
import Pagination from '../../components/pagination/pagination';
import withSuspense from '../../components/suspense/withSuspense';
import AllUsers from './components/AllUsers';

const SuspendedPagination = withSuspense(Pagination);
interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    img: string;
    isAdmin: boolean;
    isActive: boolean;
}

const UsersPage = async ({
    searchParams
}: {
    searchParams: Promise<{ q: string; page: string }>;
}) => {
    // Dummy data
    const dummyUsers: User[] = [
        {
            id: 1,
            username: 'John Doe',
            email: 'john@example.com',
            createdAt: '2025-03-08T10:00:00Z',
            img: '/astronaut.png',
            isAdmin: true,
            isActive: true
        },
        {
            id: 2,
            username: 'Jane Smith',
            email: 'jane@example.com',
            createdAt: '2025-03-07T12:00:00Z',
            img: '/astronaut.png',
            isAdmin: false,
            isActive: false
        },
        {
            id: 3,
            username: 'John Doe',
            email: 'john@example.com',
            createdAt: '2025-03-08T10:00:00Z',
            img: '/astronaut.png',
            isAdmin: true,
            isActive: true
        },
        {
            id: 4,
            username: 'Jane Smith',
            email: 'jane@example.com',
            createdAt: '2025-03-07T12:00:00Z',
            img: '/astronaut.png',
            isAdmin: false,
            isActive: false
        }
        // Add more dummy users as needed
    ];
    const searchParamsData = await searchParams;
    const q = searchParamsData?.q || '';
    const page = searchParamsData?.page || '1';
    console.log(q);
    console.log(page);

    const count = dummyUsers.length;
    const users = dummyUsers; // Use dummy users directly

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-lg font-light text-bgAdminText'>Users</h1>
                <Link href='/dashboard/users/add'>
                    <button className='py-2 px-4 bg-indigo-600 text-white rounded-md cursor-pointer'>
                        Add New
                    </button>
                </Link>
            </div>
            <table className='w-full rounded-lg shadow-md'>
                <thead>
                    <tr>
                        <td className='p-3'>Name</td>
                        <td className='p-3'>Email</td>
                        <td className='p-3'>Created At</td>
                        <td className='p-3'>Role</td>
                        <td className='p-3'>Status</td>
                        <td className='p-3'>Action</td>
                    </tr>
                </thead>
                <tbody>{/* <AllUsers />  */}</tbody>
            </table>
            <SuspendedPagination count={count} />
        </div>
    );
};

export default UsersPage;
