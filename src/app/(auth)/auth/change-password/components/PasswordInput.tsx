'use client';
import type React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const PasswordInput = ({
    id,
    label,
    value,
    onChange,
    error
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='space-y-2'>
            <div>{label}</div>
            <div className='relative'>
                <Input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    className={error ? 'border-red-500' : ''}
                />
                <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
    );
};

export default PasswordInput;
