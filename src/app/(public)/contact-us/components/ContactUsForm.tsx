'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function ContactUsForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='container mx-auto px-4 py-12'>
            {/* Contact Form Section */}
            <div className='max-w-5xl mx-auto mb-16'>
                <div className='flex justify-center mb-8'>
                    <div className='inline-block border border-gray-200 rounded-md px-8 py-2'>
                        <h2 className='text-xl font-medium text-gray-700 tracking-wide'>
                            SEND US A MESSAGE
                        </h2>
                    </div>
                </div>

                <p className='text-center text-gray-600 mb-8 max-w-2xl mx-auto'>
                    If you prefer, use the contact form below to send us a
                    message directly. Our team will get back to you as soon as
                    possible.
                </p>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <Label htmlFor='name' className='sr-only'>
                            Your Name (required)
                        </Label>
                        <Input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Your Name (required)'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='w-full h-12 bg-gray-50 border-gray-200 placeholder:text-gray-500'
                        />
                    </div>

                    <div>
                        <Label htmlFor='email' className='sr-only'>
                            Your Email (required)
                        </Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Your Email (required)'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='w-full h-12 bg-gray-50 border-gray-200 placeholder:text-gray-500'
                        />
                    </div>

                    <div>
                        <Label htmlFor='message' className='sr-only'>
                            Your Message (required)
                        </Label>
                        <Textarea
                            id='message'
                            name='message'
                            placeholder='Your Message (required)'
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className='w-full bg-gray-50 border-gray-200 placeholder:text-gray-500 resize-none'
                        />
                    </div>

                    <Button
                        type='submit'
                        className='bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium'
                    >
                        SUBMIT
                    </Button>
                </form>
            </div>

            {/* Social Media Section */}
            <div className='max-w-3xl mx-auto'>
                <div className='flex justify-center mb-8'>
                    <div className='inline-block border border-gray-200 rounded-md px-8 py-2'>
                        <h2 className='text-xl font-medium text-gray-700 tracking-wide'>
                            CONNECT WITH US ON SOCIAL MEDIA
                        </h2>
                    </div>
                </div>

                <p className='text-center text-gray-600 mb-8 max-w-2xl mx-auto'>
                    Stay updated on the latest discounts, new arrivals, and
                    promotions by following us on social media:
                </p>

                <div className='flex justify-center gap-4 mb-8'>
                    <a
                        href='#'
                        className='w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'
                        aria-label='Facebook'
                    >
                        <Facebook className='w-5 h-5 text-gray-600' />
                    </a>
                    <a
                        href='#'
                        className='w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'
                        aria-label='Instagram'
                    >
                        <Instagram className='w-5 h-5 text-gray-600' />
                    </a>
                    <a
                        href='#'
                        className='w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'
                        aria-label='TikTok'
                    >
                        <div className='w-5 h-5 text-gray-600 font-bold text-sm flex items-center justify-center'>
                            TT
                        </div>
                    </a>
                    <a
                        href='#'
                        className='w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'
                        aria-label='Twitter'
                    >
                        <Twitter className='w-5 h-5 text-gray-600' />
                    </a>
                    <a
                        href='#'
                        className='w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'
                        aria-label='YouTube'
                    >
                        <Youtube className='w-5 h-5 text-gray-600' />
                    </a>
                </div>

                <p className='text-center text-gray-600'>
                    We also welcome your feedback, comments, and reviews on our
                    social platforms.
                </p>
            </div>
        </div>
    );
}
