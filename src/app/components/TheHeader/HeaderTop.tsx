import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

const HeaderTop = () => {
    return (
        <header className='w-full bg-white'>
            <div className='container mx-auto px-4'>
                <div className='flex justify-center items-center'>
                    <div className=''>
                        <Accordion type='single' collapsible>
                            <AccordionItem
                                value='item-1'
                                className='!border-b-0'
                            >
                                <AccordionTrigger className='!w-full min-w-[300px] sm:min-w-[440px] flex items-center justify-center font-medium !text-xs py-1 relative'>
                                    <div className='relative '>
                                        <span className='pr-1'>
                                            Free US shipping{' '}
                                            <span className='font-bold'>
                                                +$10 first item on $60+
                                            </span>{' '}
                                            & 1 pt/$1
                                        </span>{' '}
                                        |{' '}
                                        <span className='underline'>
                                            See more
                                        </span>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className='bg-[#f9f9f9] p-2 border border-[#888888] rounded text-sm text-center my-2'>
                                    <p>👋 Welcome to Style Rewards!</p>
                                    <p>
                                        🚚{' '}
                                        <strong>Free domestic shipping</strong>{' '}
                                        on all US orders—no minimum spend!
                                    </p>
                                    <p>
                                        🎉 New here? Spend $60 and pick{' '}
                                        <strong>
                                            any eligible item for just $10
                                        </strong>
                                    </p>
                                    <p>
                                        ⭐ Earn 1 point for every $1 you spend
                                        (100 pts = $1 off)
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className='border-b border-gray-200 w-full'></div>
        </header>
    );
};

export default HeaderTop;
