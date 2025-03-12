'use client';

import { useState } from 'react';

const AddUserPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        isAdmin: false,
        isActive: true,
        address: ''
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here (e.g., call addUser or make an API request)
        console.log(formData);
    };

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-wrap justify-between'
            >
                <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-[45%]'
                />
                <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-[45%]'
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-[45%]'
                />
                <input
                    type='phone'
                    placeholder='Phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-[45%]'
                />
                <select
                    name='isAdmin'
                    id='isAdmin'
                    value={formData.isAdmin.toString()}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-[45%]'
                >
                    <option value='false'>Is Admin?</option>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </select>
                <select
                    name='isActive'
                    id='isActive'
                    value={formData.isActive.toString()}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-[45%]'
                >
                    <option value='true'>Is Active?</option>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </select>
                <textarea
                    name='address'
                    id='address'
                    rows={8}
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-full'
                ></textarea>
                <button
                    type='submit'
                    className='w-full py-4 bg-teal-500 text-text rounded-md cursor-pointer'
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUserPage;
