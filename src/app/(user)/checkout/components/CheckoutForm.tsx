'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreditCard, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

const formSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: 'Full name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z
        .string()
        .min(10, { message: 'Please enter a valid phone number.' }),
    address1: z.string().min(5, { message: 'Address is required.' }),
    address2: z.string().optional(),
    country: z.string().min(1, { message: 'Please select a country.' }),
    postalCode: z.string().min(3, { message: 'Postal/ZIP code is required.' })
});

const CheckoutForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    console.log('🚀 ~ CheckoutForm ~ isSubmitted:', isSubmitted);

    // Initialize form with react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            country: '',
            postalCode: ''
        }
    });

    // Handle form submission
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Form data:', values);
        setIsSubmitted(true);
        // Here you would typically send this data to your payment processor
    }

    return (
        <div className='container mx-auto max-w-2xl py-8 px-4'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>Checkout</CardTitle>
                    <CardDescription>
                        Complete your information to proceed with payment
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='fullName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='John Doe'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        placeholder='your@email.com'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='phone'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Phone Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='+1 (555) 123-4567'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name='address1'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Address Line 1
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='123 Main St'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='address2'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Address Line 2 (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Apt 4B, Floor 3, etc.'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='country'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder='Select a country' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='us'>
                                                            United States
                                                        </SelectItem>
                                                        <SelectItem value='ca'>
                                                            Canada
                                                        </SelectItem>
                                                        <SelectItem value='uk'>
                                                            United Kingdom
                                                        </SelectItem>
                                                        <SelectItem value='au'>
                                                            Australia
                                                        </SelectItem>
                                                        <SelectItem value='de'>
                                                            Germany
                                                        </SelectItem>
                                                        <SelectItem value='fr'>
                                                            France
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='postalCode'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Postal/ZIP Code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='10001'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='bg-muted/50 p-4 rounded-lg'>
                                <div className='flex items-start gap-2'>
                                    <Info className='h-5 w-5 text-muted-foreground mt-0.5' />
                                    <div className='text-sm text-muted-foreground'>
                                        <p>
                                            Your information is secure and will
                                            only be used for this purchase.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button type='submit' className='w-full'>
                                <CreditCard className='mr-2 h-4 w-4' /> Proceed
                                to Payment
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CheckoutForm;
