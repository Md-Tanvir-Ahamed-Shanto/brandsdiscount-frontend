'use client';
import type React from 'react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { X, Upload } from 'lucide-react';
import { CategoryDropdown } from './CategoryDropdown';
import Avatar from '@/components/Avatar';
import { useCreateProductMutation } from '@/api';
import { LoaderWrapper } from '@/components';

const AddProductForm = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [
        createProduct,
        { isLoading: isLoadingProductCreate, isError, error }
    ] = useCreateProductMutation();

    const [formData, setFormData] = useState({
        title: '',
        brandName: '',
        color: '',
        sku: '',
        itemLocation: '',
        sizeId: '',
        categoryId: '',
        subCategoryId: '',
        parentCategoryId: '',
        regularPrice: '',
        salePrice: '',
        platformPrice: '',
        discountPercent: '',
        stockQuantity: '',
        condition: '',
        description: '',
        status: 'Active',
        updatedById: ''
    });

    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Create proper FormData object
        const formDataObj = new FormData();

        // Append all regular fields
        Object.entries(formData).forEach(([key, value]) => {
            formDataObj.append(key, value as string);
        });

        // Append files with the correct field name (should match your API endpoint)
        files.forEach((file) => {
            formDataObj.append('file', file); // 'file' should match your backend's expected field name
        });

        try {
            const response = await createProduct(formDataObj).unwrap(); // Make sure your API expects FormData
            if (response) {
                toast.success('product created successfully');
                router.push('/dashboard/products');
            }
        } catch (err: unknown) {
            const errorMessage = 'Failed to create product';
            toast.error(errorMessage);
            console.error('Error creating product:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-wrap justify-between'
            >
                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='text'
                        placeholder='Title'
                        name='title'
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='text'
                        placeholder='Brand Name'
                        name='brandName'
                        required
                        value={formData.brandName}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='text'
                        placeholder='Color'
                        name='color'
                        value={formData.color}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='text'
                        placeholder='SKU'
                        name='sku'
                        value={formData.sku}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='text'
                        placeholder='Item Location'
                        name='itemLocation'
                        value={formData.itemLocation}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <CategoryDropdown
                        name='sizeId'
                        label='Size'
                        value={formData.sizeId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <CategoryDropdown
                        name='categoryId'
                        label='Category'
                        value={formData.categoryId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <CategoryDropdown
                        name='subCategoryId'
                        label='Sub Category'
                        value={formData.subCategoryId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <CategoryDropdown
                        name='parentCategoryId'
                        label='Parent Category'
                        value={formData.parentCategoryId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='number'
                        placeholder='Regular Price'
                        name='regularPrice'
                        value={formData.regularPrice}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='number'
                        placeholder='Sale Price'
                        name='salePrice'
                        value={formData.salePrice}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='number'
                        placeholder='Platform Price'
                        name='platformPrice'
                        value={formData.platformPrice}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='number'
                        placeholder='Discount Percent'
                        name='discountPercent'
                        value={formData.discountPercent}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='number'
                        placeholder='Stock Quantity'
                        name='stockQuantity'
                        value={formData.stockQuantity}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='text'
                        placeholder='Condition'
                        name='condition'
                        value={formData.condition}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <select
                        name='status'
                        value={formData.status}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    >
                        <option value='Active'>Active</option>
                        <option value='Inactive'>Inactive</option>
                    </select>
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <input
                        type='text'
                        placeholder='Updated By ID'
                        name='updatedById'
                        value={formData.updatedById}
                        onChange={handleInputChange}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full mb-6'>
                    <textarea
                        placeholder='Description'
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
                        suppressHydrationWarning={true}
                    />
                </div>

                <div className='w-full mb-6'>
                    <div className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'>
                        <div className='flex items-center justify-between mb-2'>
                            <span>Product Images</span>
                            <button
                                type='button'
                                onClick={triggerFileInput}
                                className='flex items-center gap-2 px-3 py-1 bg-teal-500 text-white rounded-md'
                            >
                                <Upload size={16} />
                                Upload Files
                            </button>
                            <input
                                ref={fileInputRef}
                                type='file'
                                multiple
                                onChange={handleFileChange}
                                className='hidden'
                            />
                        </div>

                        {files.length > 0 ? (
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-3'>
                                {files.map((file, index) => (
                                    <div key={index} className='relative group'>
                                        <div className='h-24 border border-[#2e374a] rounded-md flex items-center justify-center p-2 bg-bgAdmin-soft'>
                                            {file.type.startsWith('image/') ? (
                                                <Avatar
                                                    src={
                                                        URL.createObjectURL(
                                                            file
                                                        ) || '/placeholder.svg'
                                                    }
                                                    alt={file.name}
                                                    className='max-h-full max-w-full object-contain'
                                                />
                                            ) : (
                                                <div className='text-xs text-center truncate'>
                                                    {file.name}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type='button'
                                            onClick={() => removeFile(index)}
                                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-4 text-gray-500'>
                                No files uploaded yet
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full py-4 bg-teal-500 text-text rounded-md cursor-pointer disabled:opacity-70'
                >
                    {isLoading ? 'Creating Product...' : 'Create Product'}
                </button>
            </form>

            {isLoading && (
                <div className='mt-4 text-center'>
                    <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent'></div>
                </div>
            )}
            <LoaderWrapper
                isLoading={isLoadingProductCreate}
                isError={isError}
                error={error as { message: string } | undefined}
            />
        </div>
    );
};

export default AddProductForm;
