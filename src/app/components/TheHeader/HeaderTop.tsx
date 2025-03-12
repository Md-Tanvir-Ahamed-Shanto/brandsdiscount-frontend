import Link from 'next/link';
import { Globe } from 'lucide-react';
import { EXCLUSIVE, EXCLUSIVE_LINKS } from '@/static';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import InternationalShipping from './InternationalShipping';

const HeaderTop = () => {
    return (
        <header className='w-full bg-white'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col sm:flex-row justify-between items-center py-2 text-sm'>
                    <div className='text-gray-800 mb-2 sm:mb-0 flex lg:justify-start justify-center items-center gap-1'>
                        <span className='inline-block'>{EXCLUSIVE.title}</span>
                        <Link
                            href={EXCLUSIVE.link.url}
                            className='font-medium underline'
                        >
                            {EXCLUSIVE.link.label}
                        </Link>
                    </div>
                    <nav className='hidden lg:flex items-center space-x-6 relative'>
                        {EXCLUSIVE_LINKS?.map(({ id, label, url }) => (
                            <Link
                                href={url}
                                key={id}
                                className='relative text-gray-800 hover:text-black group'
                            >
                                {label}
                                <span className='text-gray-300 ml-3'>|</span>
                                <div
                                    className={`absolute -bottom-[9px] ${id === 2 ? 'right-3' : 'right-8'} w-12 h-[2px] bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                ></div>
                            </Link>
                        ))}

                        <div className='flex items-center text-gray-800'>
                            <Sheet>
                                <SheetTrigger className='flex gap-1'>
                                    <span className='mr-1'>Shipping To</span>
                                    <div className='w-5 h-5 rounded-full bg-teal-700 flex items-center justify-center'>
                                        <Globe className='w-3 h-3 text-white' />
                                    </div>
                                </SheetTrigger>
                                <SheetContent className='w-[500px]'>
                                    <InternationalShipping />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </nav>
                </div>
            </div>
            <div className='border-b border-gray-200 w-full'></div>
        </header>
    );
};

export default HeaderTop;
