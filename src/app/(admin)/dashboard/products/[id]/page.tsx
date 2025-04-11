/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { X, Upload } from 'lucide-react';
import Avatar from '@/components/Avatar';
import {
    useGetSingleProductQuery,
    useUpdateSingleProductMutation
} from '@/api';
import { LoaderWrapper } from '@/components';
import { Label } from '@/components/ui/label';
import BackBtn from '@/components/shared/Back';
import { CategoryDropdown } from '../add/components/CategoryDropdown';

const UpdateProductForm = () => {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        data: productData,
        isLoading: isLoadingProduct,
        error: fetchError
    } = useGetSingleProductQuery(productId);
    const [
        updateProduct,
        { isLoading: isLoadingProductUpdate, isError, error }
    ] = useUpdateSingleProductMutation();

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
    const [existingImages, setExistingImages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Populate form with existing product data when it loads
    useEffect(() => {
        if (productData) {
            console.log('Product data received:', productData);

            // Determine the correct structure of the product data
            // It could be productData directly, productData.data, or some other structure
            const product = productData.data || productData || {};

            if (!product) {
                console.error('Product data is undefined or null');
                toast.error('Failed to load product data');
                return;
            }

            setFormData({
                title: product.title || '',
                brandName: product.brandName || '',
                color: product.color || '',
                sku: product.sku || '',
                itemLocation: product.itemLocation || '',
                sizeId: product.sizeId || '',
                categoryId: product.categoryId || '',
                subCategoryId: product.subCategoryId || '',
                parentCategoryId: product.parentCategoryId || '',
                regularPrice: product.regularPrice?.toString() || '',
                salePrice: product.salePrice?.toString() || '',
                platformPrice: product.platformPrice?.toString() || '',
                discountPercent: product.discountPercent?.toString() || '',
                stockQuantity: product.stockQuantity?.toString() || '',
                condition: product.condition || '',
                description: product.description || '',
                status: product.status || 'Active',
                updatedById: product.updatedById || ''
            });

            // Set existing images if available
            if (product.images && Array.isArray(product.images)) {
                setExistingImages(product.images);
            }
        }
    }, [productData]);

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

    const removeExistingImage = (index: number) => {
        setExistingImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
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

        // Append existing images that weren't removed
        formDataObj.append('existingImages', JSON.stringify(existingImages));

        // Append new files
        files.forEach((file) => {
            formDataObj.append('file', file);
        });

        try {
            const response = await updateProduct({
                id: productId,
                ...formDataObj
            }).unwrap();

            if (response) {
                toast.success('Product updated successfully');
                router.push('/dashboard/products');
            }
        } catch (err: unknown) {
            const errorMessage = 'Failed to update product';
            toast.error(errorMessage);
            console.error('Error updating product:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingProduct) {
        return (
            <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
                <div className='text-center py-10'>
                    <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent'></div>
                    <p className='mt-2'>Loading product data...</p>
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
                <div className='text-center py-10'>
                    <p className='text-red-500 font-bold'>
                        Error loading product data
                    </p>
                    <p className='mt-2'>Please try again or contact support</p>
                    <button
                        onClick={() => router.push('/dashboard/products')}
                        className='mt-4 px-4 py-2 bg-teal-500 text-white rounded-md'
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
            <BackBtn
                labelFor='Products'
                url='/dashboard/products'
                className='mb-6'
            />
            <h1 className='text-2xl font-bold mb-6'>Update Product</h1>

            <form
                onSubmit={handleSubmit}
                className='flex flex-wrap justify-between'
            >
                <div className='w-full md:w-[49%] mb-6'>
                    <Label className='mb-4 block'>Title</Label>
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
                    <Label className='mb-4 block'>Brand Name</Label>
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
                    <Label className='mb-4 block'>Color</Label>
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
                    <Label className='mb-4 block'>SKU</Label>
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
                    <Label className='mb-4 block'>Item Location</Label>
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
                    <Label className='mb-4 block'>Size</Label>
                    <CategoryDropdown
                        name='sizeId'
                        label='Size'
                        value={formData.sizeId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <Label className='mb-4 block'>Category</Label>
                    <CategoryDropdown
                        name='categoryId'
                        label='Category'
                        value={formData.categoryId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <Label className='mb-4 block'>Sub Category</Label>
                    <CategoryDropdown
                        name='subCategoryId'
                        label='Sub Category'
                        value={formData.subCategoryId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <Label className='mb-4 block'>Parent Category</Label>
                    <CategoryDropdown
                        name='parentCategoryId'
                        label='Parent Category'
                        value={formData.parentCategoryId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='w-full md:w-[49%] mb-6'>
                    <Label className='mb-4 block'>Regular Price</Label>
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
                    <Label className='mb-4 block'>Sale Price</Label>
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
                    <Label className='mb-4 block'>Platform Price</Label>
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
                    <Label className='mb-4 block'>Discount Percent</Label>
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
                    <Label className='mb-4 block'>Stock Quantity</Label>
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
                    <Label className='mb-4 block'>Condition</Label>
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
                    <Label className='mb-4 block'>Status</Label>
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
                    <Label className='mb-4 block'>Updated By UserID</Label>
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
                    <Label className='mb-4 block'>Description</Label>
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

                        {/* Existing Images Section */}
                        {existingImages.length > 0 && (
                            <>
                                <h3 className='mt-4 mb-2 font-medium'>
                                    Existing Images
                                </h3>
                                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-3'>
                                    {existingImages.map((image, index) => (
                                        <div
                                            key={`existing-${index}`}
                                            className='relative group'
                                        >
                                            <div className='h-24 border border-[#2e374a] rounded-md flex items-center justify-center p-2 bg-bgAdmin-soft'>
                                                <Avatar
                                                    src={
                                                        image.url ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={`Product image ${index + 1}`}
                                                    className='max-h-full max-w-full object-contain'
                                                />
                                            </div>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    removeExistingImage(index)
                                                }
                                                className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* New Images Section */}
                        {files.length > 0 && (
                            <>
                                <h3 className='mt-4 mb-2 font-medium'>
                                    New Images
                                </h3>
                                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-3'>
                                    {files.map((file, index) => (
                                        <div
                                            key={`new-${index}`}
                                            className='relative group'
                                        >
                                            <div className='h-24 border border-[#2e374a] rounded-md flex items-center justify-center p-2 bg-bgAdmin-soft'>
                                                {file.type.startsWith(
                                                    'image/'
                                                ) ? (
                                                    <Avatar
                                                        src={
                                                            URL.createObjectURL(
                                                                file
                                                            ) ||
                                                            '/placeholder.svg'
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
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                                className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {existingImages.length === 0 && files.length === 0 && (
                            <div className='text-center py-4 text-gray-500'>
                                No files uploaded yet
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type='submit'
                    disabled={isLoading || isLoadingProductUpdate}
                    className='w-full py-4 bg-teal-500 text-text rounded-md cursor-pointer disabled:opacity-70'
                >
                    {isLoading || isLoadingProductUpdate
                        ? 'Updating Product...'
                        : 'Update Product'}
                </button>
            </form>

            {(isLoading || isLoadingProductUpdate) && (
                <div className='mt-4 text-center'>
                    <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent'></div>
                </div>
            )}
            <LoaderWrapper
                isLoading={isLoadingProductUpdate}
                isError={isError}
                error={error as { message: string } | undefined}
            />
        </div>
    );
};

export default UpdateProductForm;
