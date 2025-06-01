const AvailablePaymentMethods = () => {
    return (
        <>
            <p className='text-sm text-gray-600 mt-4 text-center'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 inline mr-1 text-green-500'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path
                        fillRule='evenodd'
                        d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.469 6.469a.75.75 0 01.018 1.042l-3.25 3.5a.75.75 0 01-1.06 0l-1.75-1.875a.75.75 0 111.082-1.022l1.22 1.305 2.732-2.953a.75.75 0 011.042-.018z'
                        clipRule='evenodd'
                    />
                </svg>
                Free Domestic US Shipping on all orders!
            </p>
            <div className='payment-logos-container mt-3'>
                <p className='text-xs text-center text-gray-500 mb-2'>
                    Accepted Payment Methods:
                </p>
                <div className='flex gap-2 justify-center'>
                    <svg
                        viewBox='0 0 38 12'
                        xmlns='http://www.w3.org/2000/svg'
                        fillRule='evenodd'
                        clipRule='evenodd'
                        strokeLinejoin='round'
                        strokeMiterlimit='1.414'
                        className='h-7 w-auto'
                    >
                        <path
                            d='M35.326 0H2.674A2.67 2.67 0 000 2.667v6.666A2.67 2.67 0 002.674 12h32.652A2.67 2.67 0 0038 9.333V2.667A2.67 2.67 0 0035.326 0zM21.612 8.14H18.99L17.4 2.236h2.568l1.644 5.904zM26.31 2.236h-2.28l-2.088 5.904h2.484l.408-1.236h2.184l.24 1.236h2.28L26.31 2.236zm-1.08 3.588l.6-2.856.6 2.856h-1.2zM15.144 5.02L13.296 2.23h2.592l1.092 2.088L15.144 5.02zm-2.916 3.12L10.2 2.236h2.568l2.028 5.904h-2.568zM8.592 2.236l-1.8 5.904H4.224L6.024 2.236h2.568z'
                            fill='#1A1F71'
                        ></path>
                    </svg>
                    <svg
                        viewBox='0 0 60 37'
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-auto'
                    >
                        <path
                            d='M30 18.5C30 8.28 23.285 0 15.714 0S1.429 8.28 1.429 18.5 8.143 37 15.714 37S30 28.72 30 18.5z'
                            fill='#FF5F00'
                        ></path>
                        <path
                            d='M58.571 18.5C58.571 8.28 51.857 0 44.286 0S30 8.28 30 18.5 36.714 37 44.286 37S58.571 28.72 58.571 18.5z'
                            fill='#EB001B'
                            fillOpacity='.8'
                        ></path>
                        <path
                            d='M44.286 18.5c0-10.22-6.714-18.5-14.286-18.5S15.714 8.28 15.714 18.5s6.714 18.5 14.286 18.5 14.286-8.28 14.286-18.5z'
                            fill='#F79E1B'
                        ></path>
                    </svg>
                    <svg
                        viewBox='0 0 38 24'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='#006FCF'
                        className='h-7 w-auto'
                    >
                        <rect width='38' height='24' rx='3'></rect>
                        <path
                            d='M11.667 12.667h2.666v-2h-2.666v2zm2.666-2.667h2.667v-2h-2.667v2zm2.667-2.666h2.666v-2H17v2zm2.667 2.666h2.666v-2h-2.666v2zm2.666 2.667h2.667v-2h-2.667v2zm0 0L25 12.667l-2.667-2.667m-10.666 0l2.666 2.667-2.666 2.667M11.667 8h14.666M11.667 16h14.666'
                            stroke='#fff'
                            strokeWidth='1.333'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        ></path>
                    </svg>
                    <svg
                        viewBox='0 0 38 24'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='#FF6600'
                        className='h-7 w-auto'
                    >
                        <rect width='38' height='24' rx='3'></rect>
                        <circle cx='19' cy='12' r='7' fill='#fff'></circle>
                        <path
                            d='M19 5a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            fill='#F2780C'
                        ></path>
                    </svg>
                </div>
            </div>
        </>
    );
};
export { AvailablePaymentMethods };
