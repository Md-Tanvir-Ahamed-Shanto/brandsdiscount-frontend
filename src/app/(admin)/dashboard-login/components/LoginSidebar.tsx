import Avatar from '@/components/Avatar';
import React from 'react';

const LoginSidebar = () => {
    return (
        <div className='bg-main-background rounded-[22px] text-main-text h-full px-8 py-16 flex flex-col justify-between'>
            <div className='mb-6'>
                <div className='text-2xl lg:text-4xl font-bold text-center mb-8 px-10'>
                    <h3 className='mb-1'>Login As Admin</h3>
                    <h3>Login based on your role: </h3>
                    <h3>Admin, Office, Employee, Warehouse, Platform User.</h3>
                </div> 
            </div>
            <div className='!w-full !h-auto'>
                <Avatar
                    src='/barChart.png'
                    alt='Cards'
                    className='!w-full !h-full'
                />
            </div>
        </div>
    );
};

export default LoginSidebar;
