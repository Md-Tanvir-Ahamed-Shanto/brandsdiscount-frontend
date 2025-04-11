'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGetSingleUserQuery, useUpdateSingleUserMutation } from '@/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LoaderWrapper } from '@/components';
import { useParams } from 'next/navigation';
import BackBtn from '@/components/shared/Back';

// Dummy user data for editing
const dummyUser = {
    id: 1,
    username: 'JohnDoe',
    email: 'john@example.com',
    password: '******', // Placeholder for password (actual passwords shouldn't be pre-filled)
    role: 'Admin',
    img: '/astronaut.png'
};

const SingleUserPage = () => {
    const params = useParams();
    console.log(params);
    console.log(params.id);
    const userId = params.id;
    console.log(userId);
    const router = useRouter();
    const [
        updateUser,
        {
            isLoading: isLoadingUpdate,
            isError: isErrorUpdate,
            error: errorUpdate
        }
    ] = useUpdateSingleUserMutation();
    const {
        data: userData,
        isLoading,
        isError
    } = useGetSingleUserQuery(userId);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });

    // Update formData when userData is available
    useEffect(() => {
        if (userData) {
            setFormData({
                username: userData.username || '',
                email: userData.email || '',
                password: '',
                role: userData.role || ''
            });
        }
    }, [userData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updated user data:', formData);
        console.log('handle submitttttttttt');
        console.log(userId);

        try {
            const response = await updateUser({
                id: userId,
                ...formData
            }).unwrap(); // Ensures error handling
            console.log(response);

            if (response?.success) {
                toast.success('User Data Updated successfully');
                router.push('/dashboard/users');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to Updated user';
            toast.error(errorMessage);
            console.error('Error Updated user:', err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading user data.</p>;

    return (
        <div className='flex gap-12 mt-5'>
            {/* User Info Section */}
            <div className='flex-[1] bg-bgAdminAdmin-soft p-5 font-bold text-soft items-center'>
                <BackBtn
                    labelFor='Users'
                    url='/dashboard/users'
                    className='mb-6'
                />
                <div className='relative rounded-md overflow-hidden mb-5'>
                    <Image
                        className='rounded-full object-cover'
                        src={dummyUser.img || '/astronaut.png'}
                        alt='User image'
                        width='70'
                        height='70'
                    />
                </div>
                <p>{userData?.username}</p>
            </div>

            {/* User Edit Form */}
            <div className='flex-[6] bg-bgAdminAdmin-soft p-5 rounded-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    {/* Username */}
                    <label className='text-sm'>Username</label>
                    <input
                        type='text'
                        name='username'
                        placeholder='Enter username'
                        value={formData.username}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md !bg-transparent text-text mb-5'
                    />

                    {/* Email */}
                    <label className='text-sm'>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdmin text-text mb-5'
                    />

                    {/* Password */}
                    <label className='text-sm'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter new password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdmin text-text mb-5'
                    />

                    {/* Role */}
                    <label className='text-sm'>Role</label>
                    <select
                        name='role'
                        value={formData.role}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdmin text-text mb-5'
                    >
                        <option value='Admin'>Admin</option>
                        <option value='OfficeEmployee'>Office Employee</option>
                        <option value='Warehouse'>Warehouse</option>
                        <option value='PlatformUser'>Platform User</option>
                    </select>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full p-5 bg-teal-500 text-text rounded-md cursor-pointer mt-5'
                    >
                        Update
                    </button>
                </form>
                {
                    <LoaderWrapper
                        isLoading={isLoadingUpdate}
                        isError={isErrorUpdate}
                        error={errorUpdate as { message: string } | undefined}
                    />
                }
            </div>
        </div>
    );
};

export default SingleUserPage;
