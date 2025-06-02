import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactUsInfo() {
    return (
        <div className='container mx-auto px-4 py-12'>
            <div className='flex justify-center mb-8'>
                <div className='inline-block border border-gray-200 rounded-md px-8 py-2'>
                    <h2 className='text-xl font-medium text-gray-700 tracking-wide'>
                        CONTACT US
                    </h2>
                </div>
            </div>

            <Card className='max-w-5xl mx-auto shadow-sm'>
                <CardHeader>
                    <CardTitle className='text-2xl font-medium text-gray-800'>
                        Contact Information
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='space-y-1'>
                            <p className='font-medium text-gray-700'>
                                Website name:
                            </p>
                            <p className='text-gray-600'>Brands Discounts</p>
                        </div>

                        <div className='space-y-1'>
                            <p className='font-medium text-gray-700'>
                                Company name:
                            </p>
                            <p className='text-gray-600'>
                                Brands Overstock LLC
                            </p>
                        </div>
                    </div>

                    <div className='flex items-start gap-3'>
                        <MapPin className='h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0' />
                        <div>
                            <p className='font-medium text-gray-700'>
                                Address:
                            </p>
                            <p className='text-gray-600'>
                                8 The Green, Dover, DE 19901, USA.
                            </p>
                        </div>
                    </div>

                    <div className='flex items-start gap-3'>
                        <Mail className='h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0' />
                        <div>
                            <p className='font-medium text-gray-700'>E-Mail:</p>
                            <a
                                href='mailto:info@brandsdiscounts.com'
                                className='text-gray-600 hover:text-primary'
                            >
                                info@brandsdiscounts.com
                            </a>
                        </div>
                    </div>

                    <div className='space-y-1'>
                        <p className='font-medium text-gray-700'>
                            Contact Form:
                        </p>
                        <a
                            href='#'
                            className='text-gray-600 hover:text-primary'
                        >
                            Contact Us
                        </a>
                    </div>

                    <div className='flex items-start gap-3'>
                        <Phone className='h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0' />
                        <div>
                            <p className='font-medium text-gray-700'>Phone:</p>
                            <a
                                href='tel:+13476182707'
                                className='text-gray-600 hover:text-primary'
                            >
                                +1 (347) 618-2707
                            </a>
                        </div>
                    </div>

                    <div className='flex items-start gap-3'>
                        <Clock className='h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0' />
                        <div>
                            <p className='font-medium text-gray-700'>
                                Customer service:
                            </p>
                            <p className='text-gray-600'>
                                Monday to Friday between 9:00 am to 5:00 pm
                            </p>
                        </div>
                    </div>

                    <div className='pt-4 border-t border-gray-100'>
                        <p className='text-gray-600 leading-relaxed'>
                            At Brands Discounts, we are committed to providing
                            exceptional customer service to ensure a smooth and
                            enjoyable shopping experience. Whether you have a
                            question about your order, need help with returns,
                            or want more information about our products, our
                            dedicated team is here to assist you. Contact us
                            today!
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
