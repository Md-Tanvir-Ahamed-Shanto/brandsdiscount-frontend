/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Edit, Save, X } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { API_BASE_URL } from '@/config';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const ShippingInformation = ({ userDetails, onUpdate }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editedDetails, setEditedDetails] = useState(userDetails || {});

    // Sync editedDetails when userDetails changes
    useEffect(() => {
        if (!isEditing) {
            setEditedDetails(userDetails || {});
        }
    }, [userDetails, isEditing]);

    const handleInputChange = (field: string, value: string) => {
        setEditedDetails((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        if (!editedDetails) return;
        
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            if (!token) {
                toast.error('You must be logged in to update your profile');
                return;
            }

            // Decode token to get userId
            const { jwtDecode } = await import('jwt-decode');
            const decoded = jwtDecode<{ id: string }>(token);
            const userId = decoded.id;

            const userDetails = {
                fullName: editedDetails.fullName,
                phoneNumber: editedDetails.phoneNumber,
                addressLine1: editedDetails.addressLine1,
                addressLine2: editedDetails.addressLine2,
                city: editedDetails.city,
                stateProvince: editedDetails.stateProvince,
                postalCode: editedDetails.postalCode,
                country: editedDetails.country
            };

            const formData = new FormData();
            formData.append('userDetails', JSON.stringify(userDetails));

            const res = await fetch(
                `${API_BASE_URL}/userroute/update/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success('Shipping information updated successfully');
                setIsEditing(false);
                if (onUpdate) {
                    onUpdate(editedDetails);
                }
            } else {
                toast.error(data?.message || 'Failed to update shipping information');
            }
        } catch (error) {
            console.error('Error updating shipping information:', error);
            toast.error('There was a problem updating your shipping information');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedDetails(userDetails || {});
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center'>
                    <MapPin className='mr-2 h-5 w-5' />
                    Shipping Information
                </CardTitle>
                <CardDescription>
                    Your order will be delivered to this address
                </CardDescription>
                {isEditing && (
                    <div className="flex justify-end space-x-2 mt-2">
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            <X className="h-4 w-4 inline mr-1" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="text-sm px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4 inline mr-1" />
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                {!userDetails ? (
                    <>
                        You have to update your profile before checkout.
                        <Link
                            href='/profile'
                            className='block mt-2 font-medium underline'
                        >
                            Update Profile{' '}
                            <ArrowRight className='h-4 w-4 inline ml-1' />
                        </Link>
                    </>
                ) : (
                    <div className='space-y-4'>
                        {isEditing ? (
                            <>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <Label htmlFor='fullName'>Full Name</Label>
                                        <Input
                                            id='fullName'
                                            value={editedDetails.fullName || ''}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            placeholder='Full Name'
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='phoneNumber'>Phone Number</Label>
                                        <Input
                                            id='phoneNumber'
                                            value={editedDetails.phoneNumber || ''}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            placeholder='Phone Number'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor='addressLine1'>Address Line 1</Label>
                                    <Input
                                        id='addressLine1'
                                        value={editedDetails.addressLine1 || ''}
                                        onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                                        placeholder='Address Line 1'
                                    />
                                </div>

                                <div>
                                    <Label htmlFor='addressLine2'>Address Line 2</Label>
                                    <Input
                                        id='addressLine2'
                                        value={editedDetails.addressLine2 || ''}
                                        onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                                        placeholder='Address Line 2 (Optional)'
                                    />
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <div>
                                        <Label htmlFor='city'>City</Label>
                                        <Input
                                            id='city'
                                            value={editedDetails.city || ''}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            placeholder='City'
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='stateProvince'>State/Province</Label>
                                        <Input
                                            id='stateProvince'
                                            value={editedDetails.stateProvince || ''}
                                            onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                                            placeholder='State/Province'
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='postalCode'>Postal Code</Label>
                                        <Input
                                            id='postalCode'
                                            value={editedDetails.postalCode || ''}
                                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                            placeholder='Postal Code'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor='country'>Country</Label>
                                    <Input
                                        id='country'
                                        value={editedDetails.country || ''}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        placeholder='Country'
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm font-medium text-muted-foreground'>
                                            Full Name
                                        </p>
                                        <p className='font-medium'>
                                            {userDetails.fullName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium text-muted-foreground'>
                                            Phone Number
                                        </p>
                                        <p className='font-medium'>
                                            {userDetails.phoneNumber}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>
                                        Address
                                    </p>
                                    <p className='font-medium'>
                                        {userDetails.addressLine1}
                                    </p>
                                    {userDetails.addressLine2 && (
                                        <p className='font-medium'>
                                            {userDetails.addressLine2}
                                        </p>
                                    )}
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <div>
                                        <p className='text-sm font-medium text-muted-foreground'>
                                            City
                                        </p>
                                        <p className='font-medium'>
                                            {userDetails.city}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium text-muted-foreground'>
                                            State/Province
                                        </p>
                                        <p className='font-medium'>
                                            {userDetails.stateProvince}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-medium text-muted-foreground'>
                                            Postal Code
                                        </p>
                                        <p className='font-medium'>
                                            {userDetails.postalCode}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className='text-sm font-medium text-muted-foreground'>
                                        Country
                                    </p>
                                    <p className='font-medium'>{userDetails.country}</p>
                                </div>

                                <div className='pt-2'>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className='text-sm flex items-center text-primary hover:underline'
                                    >
                                        <Edit className='h-4 w-4 mr-1' />
                                        Change shipping information
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ShippingInformation;
