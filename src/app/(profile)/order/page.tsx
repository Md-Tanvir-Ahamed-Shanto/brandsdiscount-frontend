/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useGetAllProfileOrderQuery } from '@/api';
import { useState } from 'react';
import { format } from 'date-fns';
import {
    ChevronDown,
    ChevronUp,
    Package,
    Clock,
    CreditCard,
    Search,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const OrderPage = () => {
    const { data: orderData, isLoading } = useGetAllProfileOrderQuery('');
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const toggleOrderDetails = (orderId: string) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
        } else {
            setExpandedOrderId(orderId);
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'MMM dd, yyyy');
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    console.log("orderData", orderData)

    const filteredOrders = orderData?.data?.filter((order: any) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderDetails.some((detail: any) =>
                detail.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );

        const matchesStatus =
            statusFilter === 'all' ||
            order.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    if (isLoading) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <h1 className='text-2xl font-bold mb-6'>My Orders</h1>
                <div className='space-y-4'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='border rounded-lg p-4'>
                            <Skeleton className='h-6 w-1/3 mb-2' />
                            <Skeleton className='h-4 w-1/4 mb-2' />
                            <Skeleton className='h-4 w-1/5' />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-2xl font-bold mb-6'>My Orders</h1>

            <div className='flex flex-col md:flex-row gap-4 mb-6'>
                <div className='relative flex-grow'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    <Input
                        placeholder='Search orders by ID or product name'
                        className='pl-10'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='w-full md:w-48'>
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger>
                            <div className='flex items-center'>
                                <Filter className='mr-2 h-4 w-4' />
                                <SelectValue placeholder='Filter by status' />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='all'>All Statuses</SelectItem>
                            <SelectItem value='pending'>Pending</SelectItem>
                            <SelectItem value='completed'>Completed</SelectItem>
                            <SelectItem value='cancelled'>Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {filteredOrders?.length === 0 ? (
                <div className='text-center py-12 border rounded-lg'>
                    <Package className='mx-auto h-12 w-12 text-gray-400 mb-4' />
                    <h3 className='text-lg font-medium'>No orders found</h3>
                    <p className='text-gray-500 mt-2'>
                        {searchTerm || statusFilter !== 'all'
                            ? 'Try adjusting your search or filter criteria'
                            : "You haven't placed any orders yet"}
                    </p>
                    {(searchTerm || statusFilter !== 'all') && (
                        <Button
                            variant='outline'
                            className='mt-4'
                            onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('all');
                            }}
                        >
                            Clear filters
                        </Button>
                    )}
                </div>
            ) : (
                <div className='space-y-4'>
                    {filteredOrders?.map((order: any) => (
                        <div
                            key={order.id}
                            className='border rounded-lg overflow-hidden'
                        >
                            <div
                                className='flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer hover:bg-gray-50'
                                onClick={() => toggleOrderDetails(order.id)}
                            >
                                <div className='flex-grow'>
                                    <div className='flex flex-col md:flex-row md:items-center gap-2 mb-2'>
                                        <h3 className='font-medium'>
                                            Order #{order.id.substring(0, 8)}
                                        </h3>
                                        <Badge
                                            className={getStatusColor(
                                                order.status
                                            )}
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>
                                    <div className='flex flex-col md:flex-row gap-4 text-sm text-gray-500'>
                                        <div className='flex items-center'>
                                            <Clock className='h-4 w-4 mr-1' />
                                            {formatDate(order.createdAt)}
                                        </div>
                                        <div className='flex items-center'>
                                            <CreditCard className='h-4 w-4 mr-1' />
                                            Transaction: {order.transactionId}
                                        </div>
                                        <div>
                                            {order.orderDetails.length}{' '}
                                            {order.orderDetails.length === 1
                                                ? 'item'
                                                : 'items'}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center mt-2 md:mt-0'>
                                    <div className='font-medium text-lg mr-3'>
                                        ${order.totalAmount.toFixed(2)}
                                    </div>
                                    {expandedOrderId === order.id ? (
                                        <ChevronUp className='h-5 w-5 text-gray-400' />
                                    ) : (
                                        <ChevronDown className='h-5 w-5 text-gray-400' />
                                    )}
                                </div>
                            </div>

                            {expandedOrderId === order.id && (
                                <div className='p-4 bg-gray-50 border-t'>
                                    <h4 className='font-medium mb-3'>
                                        Order Details
                                    </h4>
                                    <div className='overflow-x-auto'>
                                        <table className='min-w-full divide-y divide-gray-200'>
                                            <thead>
                                                <tr>
                                                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                        Product
                                                    </th>
                                                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                        SKU
                                                    </th>
                                                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                        Price
                                                    </th>
                                                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                        Quantity
                                                    </th>
                                                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className='divide-y divide-gray-200'>
                                                {order.orderDetails.map(
                                                    (detail: any) => (
                                                        <tr key={detail.id}>
                                                            <td className='px-4 py-3 whitespace-nowrap'>
                                                                <div className='flex items-center'>
                                                                    <div className='ml-2'>
                                                                        <div className='text-sm font-medium text-gray-900'>
                                                                            {
                                                                                detail.productName
                                                                            }
                                                                        </div>
                                                                        <div className='text-sm text-gray-500'>
                                                                            {detail.sizeName !==
                                                                                'Standard' &&
                                                                                detail.sizeName}
                                                                            {detail
                                                                                .product
                                                                                ?.color &&
                                                                                ` • ${detail.product.color}`}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>
                                                                {detail.sku}
                                                            </td>
                                                            <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>
                                                                $
                                                                {detail.price.toFixed(
                                                                    2
                                                                )}
                                                            </td>
                                                            <td className='px-4 py-3 whitespace-nowrap text-sm text-gray-500'>
                                                                {
                                                                    detail.quantity
                                                                }
                                                            </td>
                                                            <td className='px-4 py-3 whitespace-nowrap text-sm font-medium'>
                                                                $
                                                                {detail.total.toFixed(
                                                                    2
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                        className='px-4 py-3 text-right font-medium'
                                                    >
                                                        Order Total:
                                                    </td>
                                                    <td className='px-4 py-3 font-bold'>
                                                        $
                                                        {order.totalAmount.toFixed(
                                                            2
                                                        )}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
