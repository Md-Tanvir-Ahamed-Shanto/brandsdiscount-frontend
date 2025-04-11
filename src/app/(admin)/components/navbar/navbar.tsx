'use client';
import { usePathname } from 'next/navigation';
import Search from '../search/search';
import withSuspense from '../suspense/withSuspense';
const SuspendedSearch = withSuspense(Search);

const Navbar: React.FC = () => {
    const pathname = usePathname();
    console.log(pathname);

    return (
        <div className='p-5 rounded-lg bg-bgAdmin-soft flex flex-col md:flex-row items-center justify-between overflow-hidden mx-5'>
            {/* Title */}
            {/* <div className='text-bgAdminText-soft font-bold capitalize'>
                {isNaN(Number(pathname.split('/').pop()))
                    ? pathname.split('/').pop()
                    : pathname.split('/').slice(-2, -1)[0] +
                      ' ' +
                      pathname.split('/').pop()}
            </div> */}
            <h1 className='text-lg font-light text-bgAdminText'>
                Admin Interface
            </h1>

            {/* Menu */}
            <div className='flex items-center gap-5 pt-3 md:pt-0'>
                {/* Search Box */}
                <div className='flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg'>
                    <SuspendedSearch placeholder='Search' />
                </div>

                {/* Icons */}
                {/* <div className='flex gap-5 text-white'>
                    <MdOutlineChat size={20} />
                    <MdNotifications size={20} />
                    <MdPublic size={20} />
                </div> */}
            </div>
        </div>
    );
};

export default Navbar;
