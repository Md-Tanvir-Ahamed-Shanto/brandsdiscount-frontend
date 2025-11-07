'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useGetSingleProfileQuery } from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import Avatar from '@/components/Avatar';
import { API_BASE_URL } from '@/config';
import { useSearchParams } from 'next/navigation';
import BackBtn from '@/components/shared/Back';

export interface MyTokenPayload {
    id: string;
}

interface UserProfile {
    fullName: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
    profileImage?: string;
}

const UpdateProfile = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: userData } = useGetSingleProfileQuery(userId, {
        skip: !userId,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<UserProfile>({
        fullName: '',
        email: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: ''
    });

    const token = Cookies.get('token');
    const searchParams = useSearchParams();
    const from = searchParams.get('from');

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode<MyTokenPayload>(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    // Add this effect to populate form with existing user data
    useEffect(() => {
        if (userData && userData.userDetails) {
            setFormData({
                fullName: userData.userDetails.fullName || '',
                email: userData.email || '',
                phoneNumber: userData.userDetails.phoneNumber || '',
                addressLine1: userData.userDetails.addressLine1 || '',
                addressLine2: userData.userDetails.addressLine2 || '',
                city: userData.userDetails.city || '',
                stateProvince: userData.userDetails.stateProvince || '',
                postalCode: userData.userDetails.postalCode || '',
                country: userData.userDetails.country || ''
            });

            // Set profile picture preview if available
            if (userData.profilePicture?.url) {
                setImagePreview(userData.profilePicture.url);
            }
        }
    }, [userData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            toast.error('You must be logged in to update your profile');
            return;
        }

        try {
            const form = new FormData();

            if (imageFile) {
                form.append('file', imageFile);
            }

            form.append('userDetails', JSON.stringify(formData));
            setIsLoading(true);
            const res = await fetch(
                `${API_BASE_URL}/userroute/update/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: form
                }
            );

            const data = await res.json();

            if (res.ok && data.success) {
                setIsLoading(false);
                toast.success('Your profile has been successfully updated');
            } else {
                toast.error(data?.message || 'Failed to update profile');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating profile:', error);
            toast.error('There was a problem updating your profile');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);

            // Create a preview URL for the selected image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
        // Reset the file input
        const fileInput = document.getElementById(
            'profile-image'
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className='container mx-auto py-8 px-4'>
            <Card className='w-full max-w-3xl mx-auto'>
                {from ? (
                    <CardHeader>
                        <BackBtn
                            labelFor='Checkout'
                            url='checkout'
                            className='mb-2 pt-2'
                        />
                    </CardHeader>
                ) : (
                    ''
                )}
                <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                        Update Your Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Profile Image Upload */}
                        <div className='space-y-2'>
                            <Label htmlFor='profile-image'>Profile Image</Label>
                            <div className='flex flex-col items-center gap-4'>
                                {imagePreview ? (
                                    <div className='relative w-32 h-32'>
                                        <Avatar
                                            src={
                                                imagePreview ||
                                                '/placeholder.svg'
                                            }
                                            alt='Profile Preview'
                                            className='w-32 h-32 rounded-full object-cover border-2 border-gray-200'
                                        />
                                        <button
                                            type='button'
                                            onClick={removeImage}
                                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                                            aria-label='Remove image'
                                        >
                                            <X className='w-4 h-4' />
                                        </button>
                                    </div>
                                ) : (
                                    <div className='w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300'>
                                        <Upload className='w-8 h-8 text-gray-400' />
                                    </div>
                                )}

                                <div className='flex items-center justify-center w-full'>
                                    <label
                                        htmlFor='profile-image'
                                        className='flex flex-col items-center justify-center w-full cursor-pointer'
                                    >
                                        <div className='flex flex-col items-center justify-center'>
                                            <p className='text-sm text-gray-500'>
                                                {imagePreview
                                                    ? 'Change Image'
                                                    : 'Upload Image'}
                                            </p>
                                        </div>
                                        <input
                                            id='profile-image'
                                            type='file'
                                            accept='image/*'
                                            className='hidden'
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='fullName'>Full Name</Label>
                                <Input
                                    id='fullName'
                                    name='fullName'
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder='John Doe'
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder='john@example.com'
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='phoneNumber'>Phone Number</Label>
                            <Input
                                id='phoneNumber'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder='+1 (555) 123-4567'
                            />
                        </div>

                        {/* Address Information */}
                        <div className='space-y-2'>
                            <Label htmlFor='addressLine1'>Address Line 1</Label>
                            <Input
                                id='addressLine1'
                                name='addressLine1'
                                value={formData.addressLine1}
                                onChange={handleInputChange}
                                placeholder='123 Main St'
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='addressLine2'>Address Line 2</Label>
                            <Input
                                id='addressLine2'
                                name='addressLine2'
                                value={formData.addressLine2}
                                onChange={handleInputChange}
                                placeholder='Apt 4B (Optional)'
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='city'>City</Label>
                                <Input
                                    id='city'
                                    name='city'
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder='Rangpur'
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='stateProvince'>
                                    State/Province
                                </Label>
                                <Input
                                    id='stateProvince'
                                    name='stateProvince'
                                    value={formData.stateProvince}
                                    onChange={handleInputChange}
                                    placeholder='State/Province'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='postalCode'>
                                    Postal/Zip Code
                                </Label>
                                <Input
                                    id='postalCode'
                                    name='postalCode'
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    placeholder='12345'
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='country'>Country</Label>
                                <Input
                                    id='country'
                                    name='country'
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder='Country'
                                />
                            </div>
                        </div>

                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Profile'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateProfile;
