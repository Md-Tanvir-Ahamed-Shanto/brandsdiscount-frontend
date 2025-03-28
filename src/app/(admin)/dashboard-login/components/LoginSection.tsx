import Avatar from '@/components/Avatar'; 
import { LoginForm } from '.';

const LoginSection = () => {
    return (
        <div className='p-4 md:p-7'>
            <div className='flex items-center justify-center mb-2 bg-red-500'>
                <Avatar
                    src='/logo.png'
                    alt='Cards'
                    className='!w-[275px] !h-[66px]'
                />
            </div>
            <div className='bg-white rounded-[22px] px-3 lg:px-6 py-6 lg:py-9'>
                <div className='md:px-12 lg:px-24 text-center mb-4'>
                    <h5 className='text-black text-3xl font-bold mb-1.5'>
                        Login
                    </h5>
                    <p className='text-second-900 text-base'>
                        Login base on your role
                    </p>
                </div>
                <>
                    <LoginForm />
                </>
            </div>
        </div>
    );
};

export default LoginSection;
