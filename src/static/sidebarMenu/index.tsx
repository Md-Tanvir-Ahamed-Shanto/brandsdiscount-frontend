import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdWork,
    MdAnalytics,
    MdOutlineInventory,
    MdOutlineShoppingCartCheckout,
    MdFactCheck
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

export const MENU_ITEM: MenuCategory[] = [
    {
        title: 'Pages',
        list: [
            { title: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
            {
                title: 'OverView',
                path: '/dashboard/overview',
                icon: <MdFactCheck />
            },
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
                icon: <MdShoppingBag />
            },
            {
                title: 'Orders',
                path: '/dashboard/order',
                icon: <MdOutlineShoppingCartCheckout />
            },
            {
                title: 'Inventory',
                path: '/dashboard/inventory',
                icon: <MdOutlineInventory />
            }
        ]
    }
];
