'use client';

import { use, useState } from 'react';
import Image from 'next/image';

// Dummy user data
const dummyUser = {
    id: 1,
    username: 'JohnDoe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    img: '/astronaut.png',
    isAdmin: true,
    isActive: true
};

const SingleUserPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const user = dummyUser; // Replace with actual data fetch logic when needed

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
        isActive: user.isActive
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the form submission (e.g., call updateUser API or backend logic)
        console.log('Updated user data:', formData);
    };

    return (
        <div className='flex gap-12 mt-5'>
            {/* User Info Section */}
            <div className='flex-[1] bg-bgAdminAdmin-soft p-5 font-bold text-soft items-center'>
                <div className='object-cover relative rounded-md overflow-hidden mb-5'>
                    <Image
                        className='radius-[50%] object-cover'
                        src={user.img || '/astronaut.png'}
                        alt='user image'
                        width='70'
                        height='70'
                    />
                </div>
                <p>{user.username}</p>
            </div>

            {/* User Edit Form */}
            <div className='flex-[6] bg-bgAdminAdmin-soft p-5 rounded-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input type='hidden' name='id' value={user.id} />

                    {/* Username */}
                    <label className='text-sm'>Username</label>
                    <input
                        type='text'
                        name='username'
                        placeholder={user.username}
                        value={formData.username}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdminAdmin text-text mb-5'
                    />

                    {/* Email */}
                    <label className='text-sm'>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder={user.email}
                        value={formData.email}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdmin text-text mb-5'
                    />

                    {/* Phone */}
                    <label className='text-sm'>Phone</label>
                    <input
                        type='text'
                        name='phone'
                        placeholder={user.phone}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdmin text-text mb-5'
                    />

                    {/* Address */}
                    <label className='text-sm'>Address</label>
                    <textarea
                        name='address'
                        placeholder={user.address}
                        value={formData.address}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdmin text-text mb-5'
                    />

                    {/* Is Admin? */}
                    <label className='text-sm'>Is Admin?</label>
                    <select
                        name='isAdmin'
                        value={formData.isAdmin.toString()}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdmin text-text mb-5'
                    >
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </select>

                    {/* Is Active? */}
                    <label className='text-sm'>Is Active?</label>
                    <select
                        name='isActive'
                        value={formData.isActive.toString()}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md bg-bgAdmin text-text mb-5'
                    >
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </select>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full p-5 bg-teal-500 text-text rounded-md cursor-pointer mt-5'
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SingleUserPage;
