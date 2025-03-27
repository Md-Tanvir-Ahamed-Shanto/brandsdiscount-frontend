/* eslint-disable @typescript-eslint/no-explicit-any */ 
'use client';
import { Form } from '@/components/ui/form';   
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';   
import { ACCESS_TOKEN_EXPIRY, API_BASE_URL } from '@/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FormInput, LoadingSpinner, RoundedBtn } from '@/components';


const loginSchema = z.object({ 
    username: z.string({
      message: "Provide a valid email address",
    }).email(),
    password: z.string()
    .min(4, "Must be at least 4 characters in length")
})

const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(); 
    // Define init value.
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { 
            username: '',
            password: ''
        }
    });

    // Define submit handler.
    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${API_BASE_URL}/authroute/login`,
                { 
                    username: values.username,
                    password: values.password, 
                }
            ); 
            if (res.status === 200) { 
                const { access_token } = res?.data;
                Cookies.set('token', access_token, {
                    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY),
                    path: '/'
                });
                setLoading(false);
                window.location.href = '/dashboard'; 
                toast.success('You have successfully logged in!'); 
            } else {
                setLoading(false);
                toast.error(res?.data?.message); 
            } 
            
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.message);
        }
        
    };

    // input class
    const inputClass =
        '!py-5 bg-transparent !text-base border border-second-150 !rounded-[8px] placeholder:text-second-150 text-black';

    return (
        <div className='relative'>
            <div className='relative'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=''
                        > 
                            
                            <div className='mb-2'>
                                <FormInput
                                    label='Email*'
                                    labelClass='text-black font-semibold pl-1 !text-base'
                                    form={form}
                                    name='username'
                                    placeholder='Enter Your Email'
                                    className={inputClass}
                                />
                            </div>

                            <div className='mb-3'>
                                <FormInput
                                    label='Password*'
                                    type='password'
                                    labelClass='text-black font-semibold pl-1 !text-base'
                                    form={form}
                                    name='password'
                                    placeholder='Choose password'
                                    className={inputClass}
                                />
                            </div>

                            <div className='mb-4 my-10'>
                                <RoundedBtn
                                    type='submit'
                                    className='bg-[#020817] rounded py-3 w-full !flex items-center justify-center gap-3
                                    '
                                    disabled={loading ? true : false}
                                >
                                    {loading ? (
                                        <LoadingSpinner className='w-6 h-6' />
                                    ) : (
                                        'Sign In'
                                    )}
                                </RoundedBtn>
                            </div>
                            <div className='py-3'></div>
                        </form>
                    </Form> 
            </div> 
        </div>
    );
};

export default LoginForm;
