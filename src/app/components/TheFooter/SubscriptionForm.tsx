'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormField {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    pattern?: string;
    errorMessage: string;
}

export default function SubscriptionForm() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formFields: FormField[] = [
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email address',
            required: true,
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
            errorMessage: 'Please enter a valid email address'
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate email
        const emailField = formFields[0];
        const emailRegex = new RegExp(emailField.pattern || '');

        if (!email) {
            setIsValid(false);
            setErrorMessage('Email is required');
            return;
        }

        if (!emailRegex.test(email)) {
            setIsValid(false);
            setErrorMessage(emailField.errorMessage);
            return;
        }

        // If valid, log to console and show success
        console.log('Subscribed email:', email);
        setIsValid(true);
        setIsSubmitted(true);
        setErrorMessage('');
    };

    return (
        <div className='w-full max-w-md mb-6'>
            <h3 className='text-lg font-semibold text-white mb-4'>
                Subscribe to Our Newsletter
            </h3>

            {isSubmitted ? (
                <div className='flex items-center gap-2 text-green-500 mb-4'>
                    <CheckCircle2 className='h-5 w-5' />
                    <span>Thank you for subscribing!</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {formFields.map((field) => (
                        <div key={field.id} className='space-y-2'>
                            <h3 className='text-white'>{field.label}</h3>
                            <Input
                                id={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsValid(true);
                                    setErrorMessage('');
                                }}
                                className={cn(
                                    'bg-gray-800 border-gray-700 text-white',
                                    !isValid && 'border-red-500'
                                )}
                            />
                            {!isValid && (
                                <div className='flex items-center gap-2 text-red-500 text-sm'>
                                    <AlertCircle className='h-4 w-4' />
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                        </div>
                    ))}
                    <Button
                        type='submit'
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white'
                    >
                        Subscribe
                    </Button>
                </form>
            )}
        </div>
    );
}
