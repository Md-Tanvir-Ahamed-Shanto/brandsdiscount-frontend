import React from 'react';

const AdditionalInformation = () => {
    return (
        <div>
            <div className='w-full h-[1px] bg-gray-800 mb-8 rounded'></div>
            <h3 className='font-bold text-2xl mb-8'>Additional Information</h3>
            <div className='flex flex-col lg:flex-row gap-4 mb-8'>
                <h3 className='mr-4 text-xl font-semibold'>Description</h3>
                <p>
                    DKNY was founded by Donna Karen in 1984. She wanted to
                    create affordable fast fashion for the younger generation.
                    Today DKNY offers their eclectic fun style to people of all
                    ages around the world. Manufacturer: DKNY Size Origin: US
                    Style Type: Evening Dress Collection: DKNY Closure:
                    Material: Polyester Fabric Type: Polyester Sku: BH5563017.
                </p>
            </div>
            <div className='w-full h-[1px] bg-gray-800 mb-8 rounded'></div>
            <div className='flex flex-col lg:flex-row gap-4 mb-8'>
                <h3 className='mr-4 text-xl font-semibold mb-4 lg:mb-0'>
                    Additional information
                </h3>
                <div className='!w-full'>
                    <BoxData title='Size' content='12' />
                    <BoxData title='Color' content='NAVY' />
                    <BoxData title='Type' content='Women' />
                    <BoxData title='Size' content='12' />
                    <BoxData title='Color' content='NAVY' />
                    <BoxData title='Type' content='Women' />
                    <BoxData title='Size' content='12' />
                    <BoxData title='Color' content='NAVY' />
                    <BoxData title='Type' content='Women' />
                    <BoxData title='Size' content='12' />
                    <BoxData title='Color' content='NAVY' />
                    <BoxData title='Type' content='Women' />
                </div>
            </div>
            <div className='w-full h-[1px] bg-gray-800 mb-8 rounded'></div>
            <div className='flex flex-col lg:flex-row gap-4 mb-8'>
                <h3 className='mr-4 text-xl font-semibold mb-4 lg:mb-0'>
                    SHIPPING
                </h3>
                <div className='!w-full'>
                    For full shipping details, click here.
                </div>
            </div>
        </div>
    );
};

export default AdditionalInformation;

const BoxData = ({ title, content }: { title: string; content: string }) => {
    return (
        <>
            <div className='grid grid-cols-12 mb-4'>
                <div className='col-span-5 lg:col-span-2'>
                    <h4 className='!uppercase font-medium'>{title}</h4>
                </div>
                <div className='col-span-5 lg:col-span-2'>
                    <p className=''>{content}</p>
                </div>
            </div>
            <div className='!w-full h-[1px] bg-[#ececec] mb-4'></div>
        </>
    );
};
