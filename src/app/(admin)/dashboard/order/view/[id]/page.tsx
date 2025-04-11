/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useGetSingleOrderQuery } from '@/api';
import { LoaderWrapper } from '@/components';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft, Edit } from 'lucide-react';
import { useParams } from 'next/navigation';
import BackBtn from '@/components/shared/Back';

const SingleOrderViewPage = () => {
    const { id } = useParams();

    const {
        data: orderData,
        isLoading,
        isError,
        error
    } = useGetSingleOrderQuery(id);

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'PPP p');
        } catch (error: any) {
            return dateString;
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading order data.</p>;

    return (
        <div className='flex flex-col gap-6 mt-5'>
            {/* Header with back button and edit button */}
            <div className='flex justify-between items-center px-4'>
                <BackBtn labelFor='Order' url='/dashboard/order' />
                <Link
                    href={`/order/${id}`}
                    className='flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-md'
                >
                    <Edit size={16} />
                    Edit Order
                </Link>
            </div>

            {/* Order Summary */}
            <div className='bg-bgAdminAdmin-soft p-5 rounded-lg'>
                <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Order ID
                            </span>
                            <span className='font-medium'>{orderData.id}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Status
                            </span>
                            <span
                                className={`font-medium ${
                                    orderData.status === 'completed'
                                        ? 'text-green-500'
                                        : orderData.status === 'cancelled'
                                          ? 'text-red-500'
                                          : orderData.status === 'processing'
                                            ? 'text-blue-500'
                                            : 'text-yellow-500'
                                }`}
                            >
                                {orderData.status?.toUpperCase() || 'N/A'}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Total Amount
                            </span>
                            <span className='font-medium'>
                                ${orderData.totalAmount?.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Created At
                            </span>
                            <span className='font-medium'>
                                {formatDate(orderData.createdAt)}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Updated At
                            </span>
                            <span className='font-medium'>
                                {formatDate(orderData.updatedAt)}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Transaction ID
                            </span>
                            <span className='font-medium'>
                                {orderData.transactionId || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction Information */}
            {orderData.transaction && (
                <div className='bg-bgAdminAdmin-soft p-5 rounded-lg'>
                    <h2 className='text-xl font-semibold mb-4'>
                        Transaction Information
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Transaction ID
                            </span>
                            <span className='font-medium'>
                                {orderData.transaction.transactionId}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Amount
                            </span>
                            <span className='font-medium'>
                                ${orderData.transaction.amount?.toFixed(2)}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Status
                            </span>
                            <span
                                className={`font-medium ${
                                    orderData.transaction.status === 'Completed'
                                        ? 'text-green-500'
                                        : 'text-yellow-500'
                                }`}
                            >
                                {orderData.transaction.status}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>Date</span>
                            <span className='font-medium'>
                                {formatDate(orderData.transaction.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Information */}
            {orderData.user && (
                <div className='bg-bgAdminAdmin-soft p-5 rounded-lg'>
                    <h2 className='text-xl font-semibold mb-4'>
                        Customer Information
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Customer ID
                            </span>
                            <span className='font-medium'>
                                {orderData.user.id}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>
                                Username
                            </span>
                            <span className='font-medium'>
                                {orderData.user.username}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-400'>Email</span>
                            <span className='font-medium'>
                                {orderData.user.email}
                            </span>
                        </div>
                    </div>

                    {/* User Details */}
                    {orderData.user.userDetails && (
                        <div className='mt-4 border-t border-[#2e374a] pt-4'>
                            <h3 className='text-lg font-medium mb-3'>
                                Shipping Details
                            </h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        Full Name
                                    </span>
                                    <span className='font-medium'>
                                        {orderData.user.userDetails.fullName ||
                                            'N/A'}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        Phone Number
                                    </span>
                                    <span className='font-medium'>
                                        {orderData.user.userDetails
                                            .phoneNumber || 'N/A'}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        Address Line 1
                                    </span>
                                    <span className='font-medium'>
                                        {orderData.user.userDetails
                                            .addressLine1 || 'N/A'}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        Address Line 2
                                    </span>
                                    <span className='font-medium'>
                                        {orderData.user.userDetails
                                            .addressLine2 || 'N/A'}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        City
                                    </span>
                                    <span className='font-medium'>
                                        {orderData.user.userDetails.city ||
                                            'N/A'}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        State/Province
                                    </span>
                                    <span className='font-medium'>
                                        {orderData.user.userDetails
                                            .stateProvince || 'N/A'}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        Postal Code
                                    </span>
                                    <span className='font-medium'>
                                        {orderData.user.userDetails
                                            .postalCode || 'N/A'}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        Country
                                    </span>
                                    <span className='font-medium'>
                                        {orderData.user.userDetails.country ||
                                            'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Order Items */}
            {orderData.orderDetails && orderData.orderDetails.length > 0 && (
                <div className='bg-bgAdminAdmin-soft p-5 rounded-lg'>
                    <h2 className='text-xl font-semibold mb-4'>Order Items</h2>
                    <div className='space-y-4'>
                        {orderData.orderDetails.map(
                            (item: any, index: number) => (
                                <div
                                    key={item.id || index}
                                    className='border border-[#2e374a] rounded-lg p-4'
                                >
                                    <div className='flex justify-between items-start mb-3'>
                                        <h3 className='text-lg font-medium'>
                                            {item.productName}
                                        </h3>
                                        <div className='text-right'>
                                            <div className='text-sm text-gray-400'>
                                                Item Total
                                            </div>
                                            <div className='font-medium'>
                                                ${item.total?.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                        <div className='flex flex-col'>
                                            <span className='text-sm text-gray-400'>
                                                Price
                                            </span>
                                            <span className='font-medium'>
                                                ${item.price?.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm text-gray-400'>
                                                Quantity
                                            </span>
                                            <span className='font-medium'>
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm text-gray-400'>
                                                Size
                                            </span>
                                            <span className='font-medium'>
                                                {item.sizeName || 'N/A'}
                                            </span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm text-gray-400'>
                                                Category
                                            </span>
                                            <span className='font-medium'>
                                                {item.categoryName || 'N/A'}
                                            </span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm text-gray-400'>
                                                SKU
                                            </span>
                                            <span className='font-medium'>
                                                {item.sku}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    {item.product && (
                                        <div className='mt-4 border-t border-[#2e374a] pt-4'>
                                            <h4 className='text-md font-medium mb-2'>
                                                Product Details
                                            </h4>
                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                                <div className='flex flex-col'>
                                                    <span className='text-sm text-gray-400'>
                                                        Brand
                                                    </span>
                                                    <span className='font-medium'>
                                                        {item.product
                                                            .brandName || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-sm text-gray-400'>
                                                        Color
                                                    </span>
                                                    <span className='font-medium'>
                                                        {item.product.color ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-sm text-gray-400'>
                                                        Condition
                                                    </span>
                                                    <span className='font-medium'>
                                                        {item.product
                                                            .condition || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-sm text-gray-400'>
                                                        Regular Price
                                                    </span>
                                                    <span className='font-medium'>
                                                        $
                                                        {item.product.regularPrice?.toFixed(
                                                            2
                                                        ) || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-sm text-gray-400'>
                                                        Sale Price
                                                    </span>
                                                    <span className='font-medium'>
                                                        $
                                                        {item.product.salePrice?.toFixed(
                                                            2
                                                        ) || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-sm text-gray-400'>
                                                        Discount
                                                    </span>
                                                    <span className='font-medium'>
                                                        {item.product
                                                            .discountPercent ||
                                                            0}
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            <LoaderWrapper
                isLoading={isLoading}
                isError={isError}
                error={error as { message: string } | undefined}
            />
        </div>
    );
};

export default SingleOrderViewPage;
