import { FOOTER_SECTIONS, LEGAL_LINKS, SOCIAL_LINKS } from '@/static';
import SubscriptionForm from './SubscriptionForm';

const TheFooter = () => {
    return (
        <main>
            {/* Main content would go here */}

            {/* Footer */}
            <footer className='bg-black text-white'>
                <div className='container mx-auto py-10'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {/* Map through footer sections */}
                        {FOOTER_SECTIONS.map((section, index) => (
                            <div key={index}>
                                <h2 className='text-lg font-semibold mb-4'>
                                    {section.title}
                                </h2>
                                <ul className='space-y-2'>
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href={link.href}
                                                className='text-gray-300 hover:text-white'
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Connect With Us section with subscription form */}
                        <div>
                            {/* Subscription form appears before Connect With Us */}
                            <SubscriptionForm />

                            <h2 className='text-lg font-semibold mb-4'>
                                Connect With Us
                            </h2>
                            <div className='flex space-x-4'>
                                {SOCIAL_LINKS.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            aria-label={social.label}
                                            className='text-gray-300 hover:text-white'
                                        >
                                            <Icon className='h-6 w-6' />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Legal links */}
                    <div className='mt-10 pt-6 border-t border-gray-800 px-4 md:px-24 lg:px-48'>
                        <div className='flex flex-wrap items-center justify-center gap-4 mb-4'>
                            {LEGAL_LINKS.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className='text-gray-300 hover:text-white text-sm'
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>

                        {/* Copyright */}
                        <p className='text-center text-gray-400 text-sm'>
                            © 2025 Brand-Discount. All rights reserved.
                            brands-discount.com, LLC, 151 West 34th Street, New
                            York, NY 10001.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default TheFooter;
