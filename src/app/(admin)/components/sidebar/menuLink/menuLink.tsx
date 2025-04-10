'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MenuItem {
    title: string;
    path: string;
    icon: ReactNode;
}

interface MenuLinkProps {
    item: MenuItem;
}

const MenuLink: React.FC<MenuLinkProps> = ({ item }) => {
    const pathname = usePathname();

    return (
        <Link
            href={item.path}
            className={`flex gap-5 p-2 items-center text-bgAdminText-soft transition-colors m-1 rounded-md
                ${pathname === item.path ? 'bg-[#2e374a] text-white' : 'hover:bg-[#3a465d] hover:[#2e374a]'}`}
        >
            {item.icon}
            {item.title}
        </Link>
    );
};

export default MenuLink;
