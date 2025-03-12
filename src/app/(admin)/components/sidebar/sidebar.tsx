import Image from 'next/image';
import MenuLink from './menuLink/menuLink';
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout
} from 'react-icons/md';

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
                title: 'Products',
                path: '/dashboard/products',
                icon: <MdShoppingBag />
            },
            {
                title: 'Transactions',
                path: '/dashboard/transactions',
                icon: <MdAttachMoney />
            }
        ]
    },
    {
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
    }
];

const Sidebar = async () => {
    return (
        <div className='position-sticky text-bgAdminText mt-5 mb-5'>
            <div className='flex items-center gap-2 mb-5'>
                <Image
                    className='radius-[50%] object-cover'
                    src='/astronaut.png'
                    alt=''
                    width='50'
                    height='50'
                />
                <div className='flex items-center flex-col'>
                    <span className='font-medium'>John Doe</span>
                    <span className='text-sm text-bgAdminText-soft'>
                        Administrator
                    </span>
                </div>
            </div>
            <ul className=''>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className='text-bgAdminText font-bold text-lg m-3'>
                            {cat.title}
                        </span>
                        {cat.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <form>
                <button className='w-full flex items-center gap-2 p-5 my-1 cursor-pointer rounded-lg border-none bg-transparent text-white hover:bg-[#2e374a]'>
                    <MdLogout />
                    Logout
                </button>
            </form>
        </div>
    );
};

export default Sidebar;
