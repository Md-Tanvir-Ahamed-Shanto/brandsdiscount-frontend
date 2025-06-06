import React from 'react';

const PaymentPolicy = () => {
    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6'>Payment Policy</h1>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>Payment Methods</h2>
                <p className='mb-4'>
                    We offer a range of payment options to make your checkout
                    experience smooth and flexible. You can securely complete
                    your purchase using any of the following methods:
                </p>

                <div className='bg-white p-6 rounded-lg shadow-sm mb-6'>
                    <ul className='list-disc pl-6 mb-4'>
                        <li>
                            <strong>Credit Card / Debit Card:</strong> Major
                            credit and debit cards are accepted.
                        </li>
                        <li>
                            <strong>Apple Pay & Google Pay:</strong> Checkout
                            swiftly using your mobile wallet.
                        </li>
                        <li>
                            <strong>Stripe:</strong> Process payments securely
                            via Stripe&apos;s trusted platform.
                        </li>
                    </ul>
                </div>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    Secure Payment Processing
                </h2>
                <div className='bg-gray-50 p-6 rounded-lg'>
                    <p className='mb-4'>
                        We prioritize your security and privacy. All payments
                        are processed through reputable third-party providers,
                        and your payment details are encrypted to ensure they
                        are protected throughout the transaction. Our website
                        does not store your credit card information, providing
                        you with an additional layer of safety.
                    </p>
                </div>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>Payment Issues</h2>
                <p className='mb-4'>
                    If you encounter any problems with your payment, please
                    contact our customer support team with your order id for
                    assistance via the Contact page. We&apos;re here to help
                    resolve any issues promptly.
                </p>
                <p className='mb-4'>
                    For details on refunds and cancellations, please refer to
                    our Refund & Returns Policy.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    Contact Information
                </h2>
                <div className='bg-white p-6 rounded-lg shadow-sm'>
                    <ul className='list-disc pl-6 mb-4'>
                        <li>
                            <strong>Email:</strong> info@brandsdiscounts.com
                        </li>
                        <li>
                            <strong>Phone:</strong> +1 (347) 618-2707
                        </li>
                        <li>
                            <strong>Address:</strong> 8 The Green, Dover, DE
                            19901, USA
                        </li>
                        <li>
                            <strong>Customer Service Hours:</strong> Monday to
                            Friday between 9:00 am to 5:00 pm
                        </li>
                    </ul>
                </div>
            </section>

            <section className='mb-8'>
                <div className='bg-blue-50 p-6 rounded-lg'>
                    <h2 className='text-2xl font-semibold mb-4'>Need Help?</h2>
                    <p className='mb-4'>
                        Our customer service team is available to assist you
                        with any payment-related questions or concerns. Please
                        don&apos;t hesitate to reach out to us through any of
                        the contact methods listed above.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PaymentPolicy;
