import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function AdminPanel() {
    return (
        <Card className='w-full mx-auto border-l-4 border-l-white bg-[#192133] text-white'>
            <CardHeader className='flex flex-row items-start space-x-4 pb-2'>
                <div className='p-2 bg-white/10 rounded-lg'>
                    <Shield className='h-6 w-6 text-white' />
                </div>
                <div className='space-y-1 '>
                    <CardTitle className='text-2xl font-bold text-white'>
                        Admin Dashboard
                    </CardTitle>
                    <CardDescription className='text-base text-white font-light'>
                        Complete system access and management
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className='text-muted-foreground text-white'>
                    Welcome to the administration panel. You have full access to
                    all system features and data.
                </p>
            </CardContent>
        </Card>
    );
}
