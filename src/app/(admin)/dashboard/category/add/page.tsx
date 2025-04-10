'use client';
import { useCreateCategoryMutation } from '@/api';
import { LoaderWrapper } from '@/components';
import BackBtn from '@/components/shared/Back';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddUserPage = () => {
    const [createCategory, { isLoading, isError, error }] =
        useCreateCategoryMutation();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: ''
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
            const response = await createCategory(formData).unwrap(); // Ensures error handling

            if (response?.success) {
                toast.success('category created successfully');
                router.push('/dashboard/category');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to create category';
            toast.error(errorMessage);
            console.error('Error creating category:', err);
        }
    };

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5 mx-5'>
            <BackBtn
                labelFor='Category'
                url='/dashboard/category'
                className='mb-6'
            />
            <form
                onSubmit={handleSubmit}
                className='flex flex-wrap justify-between'
            >
                <input
                    type='text'
                    placeholder='Add Category Name'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md mb-6 w-full'
                />
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
