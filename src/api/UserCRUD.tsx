import React, { useState } from 'react';
import {
    useCreateUserMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery
} from './userApi';

const UserCRUD = () => {
    const [createUser] = useCreateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createUser(formData);
    };

    // get

    const { data: users, isFetching, isLoading } = useGetAllUsersQuery('');

    // Handle loading or fetching states
    if (isLoading) {
        return (
            <div className='text-center text-gray-500'>Loading users...</div>
        );
    }

    if (isFetching) {
        return (
            <div className='text-center text-gray-500'>
                Updating user data...
            </div>
        );
    }

    // Handle the case when users data is empty or undefined
    if (!users || users.length === 0) {
        return <div className='text-center text-gray-500'>No users found.</div>;
    }

    return (
        <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className='mb-4'>
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='Enter your name'
                    />
                </div>

                {/* Email */}
                <div className='mb-4'>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='Enter your email'
                    />
                </div>

                {/* Age */}
                <div className='mb-4'>
                    <label
                        htmlFor='age'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Age
                    </label>
                    <input
                        type='number'
                        id='age'
                        name='age'
                        value={formData.age}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='Enter your age'
                    />
                </div>

                {/* Gender */}
                <div className='mb-4'>
                    <label
                        htmlFor='gender'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Gender
                    </label>
                    <select
                        id='gender'
                        name='gender'
                        value={formData.gender}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type='submit'
                        className='w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        Submit
                    </button>
                </div>
            </form>

            <div className='flex flex-col gap-4'>
                {users.map(
                    (user: {
                        id: string;
                        name: string;
                        email: string;
                        age: string;
                        gender: string;
                    }) => (
                        <div
                            key={user.id}
                            className='p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow'
                        >
                            <h3 className='text-lg font-bold text-gray-800'>
                                {user.name}
                            </h3>
                            <p className='text-sm text-gray-600'>
                                Email: {user.email}
                            </p>
                            <p className='text-sm text-gray-600'>
                                Age: {user.age}
                            </p>
                            <p className='text-sm text-gray-600'>
                                Genderrrrr: {user.gender}
                            </p>

                            {/* Button to show the user's id */}
                            <button
                                className='mt-2 px-4 py-2 bg-red-500 text-black text-sm font-medium rounded hover:bg-blue-600 transition-colors'
                                onClick={() => deleteUser(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default UserCRUD;
