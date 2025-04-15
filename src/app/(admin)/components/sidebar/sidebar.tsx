/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import UserDetails from './UserDetails';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { MyTokenPayload } from '@/app/(profile)/profile/page';
import { useGetSingleProfileQuery } from '@/api';
import { MENU_ITEM } from '@/static/sidebarMenu';
import { MdLogout } from 'react-icons/md';
import NavLink from './NavLink';

const Sidebar = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const { data: userData } = useGetSingleProfileQuery(userId);

    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('rtoken');
        router.push('/dashboard-login');
        toast.success('Log out successfully');
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode<MyTokenPayload>(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const roleTitles: Record<string, string> = {
        Admin: 'Admin Panel',
        Cashier: 'Cashier Dashboard',
        OfficeEmpolyee: 'Office Dashboard',
        WareHouse: 'Warehouse Panel',
        PlatformUser: 'User Panel'
    };

    return (
        <div className='position-sticky text-bgAdminText mt-0 h-full p-4 rounded-r-xl'>
            <div className='text-white font-bold text-2xl mb-6 text-center'>
                {roleTitles[userData?.role] || 'Dashboard'}
            </div>

            <UserDetails />

            <ul>
                <li>
                    <div className='text-white font-bold text-xl mx-3 mb-4 capitalize'>
                        {userData?.role || 'Loading...'}
                    </div>
                    <NavLink
                        link={MENU_ITEM[0]?.list[0].path}
                        label={MENU_ITEM[0]?.list[0].title}
                        icon={MENU_ITEM[0]?.list[0].icon}
                    />
                    {userData?.role === 'Admin' ? (
                        <NavLink
                            link={MENU_ITEM[0]?.list[1].path}
                            label={MENU_ITEM[0]?.list[1].title}
                            icon={MENU_ITEM[0]?.list[1].icon}
                        />
                    ) : (
                        ''
                    )}
                    {userData?.role === 'Admin' ? (
                        <NavLink
                            link={MENU_ITEM[0]?.list[2].path}
                            label={MENU_ITEM[0]?.list[2].title}
                            icon={MENU_ITEM[0]?.list[2].icon}
                        />
                    ) : (
                        ''
                    )}
                    {userData?.role === 'Admin' ? (
                        <NavLink
                            link={MENU_ITEM[0]?.list[3].path}
                            label={MENU_ITEM[0]?.list[3].title}
                            icon={MENU_ITEM[0]?.list[3].icon}
                        />
                    ) : (
                        ''
                    )}
                    {userData?.role === 'Admin' ? (
                        <NavLink
                            link={MENU_ITEM[0]?.list[4].path}
                            label={MENU_ITEM[0]?.list[4].title}
                            icon={MENU_ITEM[0]?.list[4].icon}
                        />
                    ) : (
                        ''
                    )}
                    {userData?.role === 'WareHouse' ||
                    userData?.role === 'Admin' ||
                    userData?.role === 'OfficeEmpolyee' ? (
                        <NavLink
                            link={MENU_ITEM[0]?.list[5].path}
                            label={MENU_ITEM[0]?.list[5].title}
                            icon={MENU_ITEM[0]?.list[5].icon}
                        />
                    ) : (
                        ''
                    )}
                    {userData?.role === 'Admin' ? (
                        <NavLink
                            link={MENU_ITEM[0]?.list[6].path}
                            label={MENU_ITEM[0]?.list[6].title}
                            icon={MENU_ITEM[0]?.list[6].icon}
                        />
                    ) : (
                        ''
                    )}
                    {userData?.role === 'Cashier' ||
                    userData?.role === 'Admin' ? (
                        <NavLink
                            link={MENU_ITEM[0]?.list[7].path}
                            label={MENU_ITEM[0]?.list[7].title}
                            icon={MENU_ITEM[0]?.list[7].icon}
                        />
                    ) : (
                        ''
                    )}
                </li>
            </ul>

            <form>
                <button
                    className='flex items-center gap-2 py-1.5 px-4 my-1 cursor-pointer rounded-lg border-none bg-transparent text-white 
              hover:bg-[#2e374a] !bg-red-500 ml-1 mt-4'
                    onClick={handleLogout}
                >
                    <MdLogout />
                    Logout
                </button>
            </form>
        </div>
    );
};

export default Sidebar;
