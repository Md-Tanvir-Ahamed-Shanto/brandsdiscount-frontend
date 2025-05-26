'use client';
import type React from 'react';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

export default function ChangePassword() {
    return (
        <div className='flex items-center p-4'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Loyalty Points</CardTitle>
                    <CardDescription>
                        Update your password by filling out the form below.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
