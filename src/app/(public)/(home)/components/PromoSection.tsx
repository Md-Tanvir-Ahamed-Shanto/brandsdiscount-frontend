import { PROMO_ITEMS } from '@/static';

export default function PromoSection() {
    return (
        <section className=''>
            <div className='container mx-auto'>
                <div className='text-center mb-12 py-8 bg-gray-100 rounded'>
                    <p className='text-gray-800 font-medium'>
                        Join the Style Rewards Club: Unlock more with every
                        purchase—no hoops, just perks.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-12 pb-4'>
                    {PROMO_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className='flex flex-col items-start'
                            >
                                <div className='min-h-[200px]'>
                                    <Icon className='h-8 w-8 mb-4 text-gray-800' />
                                    <h3 className='text-lg lg:text-xl font-semibold mb-2'>
                                        {item.title.includes('25%') ? (
                                            <>
                                                Sign up for emails & <br />
                                                <span className='font-bold'>
                                                    get an extra 25% off
                                                </span>
                                            </>
                                        ) : (
                                            item.title
                                        )}
                                    </h3>
                                    <p className='text-gray-700 mb-4'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
