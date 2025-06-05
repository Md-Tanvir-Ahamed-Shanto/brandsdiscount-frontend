import { LEGAL_LINKS } from '@/static';
import { PromoSection } from '@/app/(public)/(home)/components';
import PaymentIcons from './PaymentIcons';

const TheFooter = () => {
    return (
        <main>
            <PromoSection />
            <footer className='bg-neutral-900 text-white'>
                <div className='container mx-auto py-10 flex flex-col items-center'>
                    <PaymentIcons />
                    <div className='flex flex-wrap justify-center gap-6 mb-4 text-sm'>
                        {LEGAL_LINKS.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className='hover:underline'
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>

                    <div className='text-center text-sm space-y-1 mt-2'>
                        <div>
                            Copyright 2025 &copy;{' '}
                            <span className='font-semibold'>
                                Brands Discounts
                            </span>
                        </div>
                        <div>
                            Business Address: 8 The Green, Dover, DE, 19901, USA
                        </div>
                        <div>Contact Phone: +1 (347) 618-2707</div>
                        <div>Contact Email: info@brandsdiscounts.com</div>
                        <div>
                            Support Hours: Monday to Friday, 9:00 AM to 5:00 PM
                            (Eastern Time, GMT-5)
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default TheFooter;
