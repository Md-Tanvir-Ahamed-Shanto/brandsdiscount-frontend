import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';

const AdminLayout = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='w-screen h-screen flex'>
            {/* Sidebar takes 1/5 of the width */}
            <div className='flex-[1] h-full bg-bgAdmin-soft text-bgAdminText-soft'>
                <Sidebar />
            </div>
            {/* Main content takes 4/5 of the width */}
            <div className='flex-[4] h-full bg-bgAdmin text-bgAdminText overflow-auto'>
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
