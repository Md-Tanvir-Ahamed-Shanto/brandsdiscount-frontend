'use client';

import { useCreateUserMutation } from '@/api';
import { LoaderWrapper } from '@/components';
import BackBtn from '@/components/shared/Back';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddUserPage = () => {
    const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Admin' // Default role
    });

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
        console.log(formData); // Log form data on submit

        try {
            const response = await createUser(formData).unwrap(); // Ensures error handling

            if (response?.success) {
                toast.success('User created successfully');
                router.push('/dashboard/users');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to create user';
            toast.error(errorMessage);
            console.error('Error creating user:', err);
        }
    };

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5 mx-5'>
            <BackBtn labelFor='Users' url='/dashboard/users' className='mb-6' />
            <form
                onSubmit={handleSubmit}
                className='flex flex-wrap justify-between'
            >
                <Label className='mb-4'>Username</Label>
                <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-full'
                />
                <Label className='mb-4'>Email</Label>
                <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-full'
                />
                <Label className='mb-4'>Password</Label>
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-full'
                />
                <Label className='mb-4'>Select Role</Label>
                <select
                    name='role'
                    value={formData.role}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-full'
                >
                    <option value='Admin'>Admin</option>
                    <option value='OfficeEmployee'>Office Employee</option>
                    <option value='WareHouse'>Warehouse</option>
                    <option value='PlatformUser'>Platform User</option>
                </select>
                <button
                    type='submit'
                    className='w-full py-4 bg-teal-500 text-text rounded-md cursor-pointer'
                >
                    Submit
                </button>
            </form>
            <LoaderWrapper
                isLoading={isLoading}
                isError={isError}
                error={error as { message: string } | undefined}
            />
        </div>
    );
};

export default AddUserPage;
