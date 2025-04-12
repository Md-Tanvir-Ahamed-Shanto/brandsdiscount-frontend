/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ label, link, icon }: any) => {
    const pathname = usePathname();
    return (
        <Link
            href={link}
            className={`flex gap-5 p-2 items-center text-bgAdminText-soft transition-colors m-1 rounded-md
                ${pathname === link ? 'bg-[#2e374a] text-white' : 'hover:bg-[#3a465d] hover:[#2e374a]'} mb-4`}
        >
            {icon}
            {label}
        </Link>
    );
};

export default NavLink;
