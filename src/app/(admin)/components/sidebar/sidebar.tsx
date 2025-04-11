'use client';
import MenuLink from './menuLink/menuLink';
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdWork,
    MdAnalytics,
    MdOutlineSettings,
    MdLogout
} from 'react-icons/md';
import UserDetails from './UserDetails';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

interface MenuCategory {
    title: string;
    list: MenuItem[];
}

const menuItems: MenuCategory[] = [
    {
        title: 'Pages',
        list: [
            { title: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
            {
                title: 'Users',
                path: '/dashboard/users',
                icon: <MdSupervisedUserCircle />
            },
            {
                title: 'Size',
                path: '/dashboard/size',
                icon: <MdWork />
            },
            {
                title: 'Category',
                path: '/dashboard/category',
                icon: <MdAnalytics />
            },
            {
                title: 'Products',
                path: '/dashboard/products',
                icon: <MdOutlineSettings />
            },
            {
                title: 'Orders',
                path: '/dashboard/order',
                icon: <MdShoppingBag />
            }
            /* {
                title: 'Transactions',
                path: '/dashboard/transactions',
                icon: <MdAttachMoney />
            } */
        ]
    }
    /*  {
        title: 'Analytics',
        list: [
            { title: 'Revenue', path: '/dashboard/revenue', icon: <MdWork /> },
            {
                title: 'Reports',
                path: '/dashboard/reports',
                icon: <MdAnalytics />
            },
            { title: 'Teams', path: '/dashboard/teams', icon: <MdPeople /> }
        ]
    },
    {
        title: 'User',
        list: [
            {
                title: 'Settings',
                path: '/dashboard/settings',
                icon: <MdOutlineSettings />
            },
            { title: 'Help', path: '/dashboard/help', icon: <MdHelpCenter /> }
        ]
    } */
];

const Sidebar = () => {
    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('rtoken');
        router.push('/dashboard-login');
        toast.success('Log out successfully');
    };
    return (
        <div className='position-sticky text-bgAdminText mt-0 h-full p-4 rounded-r-xl'>
            <UserDetails />
            <ul className=''>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <div className='text-bgAdminText font-bold text-lg mx-3 mb-4'>
                            {cat.title}
                        </div>
                        {cat.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
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
