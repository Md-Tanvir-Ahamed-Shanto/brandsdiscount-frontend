import React from 'react';

const Shipping = () => {
    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6'>Shipping Policy</h1>

            <div className='mb-8 bg-gray-50 p-6 rounded-lg'>
                <h2 className='text-xl font-semibold mb-4'>
                    Shipping Information
                </h2>
                <ul className='list-disc pl-6 mb-4'>
                    <li>
                        <strong>Cutoff Time:</strong> 22:00 (GMT-05:00)
                    </li>
                    <li>
                        <strong>Time Zone:</strong> Eastern Standard Time (New
                        York)
                    </li>
                    <li>
                        <strong>Order Processing Time:</strong> 1-2 business
                        days
                    </li>
                    <li>
                        <strong>Shipping Days:</strong> Monday – Friday
                    </li>
                    <li>
                        <strong>Delivery Time (Domestic):</strong> 3-7 business
                        days
                    </li>
                    <li>
                        <strong>Delivery Time (International):</strong> 4-6
                        weeks
                    </li>
                    <li>
                        <strong>Shipping Method:</strong> USPS for domestic and
                        international orders
                    </li>
                </ul>
            </div>

            <div className='mb-8'>
                <p className='text-lg mb-4'>
                    Welcome to Brands Discounts! We are dedicated to providing
                    clear and efficient shipping options to ensure your orders
                    arrive promptly and securely. Below is a detailed outline of
                    our shipping policies:
                </p>
            </div>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    Domestic Shipping
                </h2>
                <p className='mb-4'>
                    We offer reliable shipping within the United States with the
                    following options:
                </p>

                <div className='bg-white p-6 rounded-lg shadow-sm mb-6'>
                    <ul className='list-disc pl-6 mb-4'>
                        <li>
                            <strong>Standard Shipping:</strong> $9.95 flat rate
                        </li>
                        <li>
                            <strong>Free Shipping:</strong> Available on orders
                            over $49
                        </li>
                        <li>
                            <strong>Delivery Time:</strong> 3-7 business days
                        </li>
                    </ul>
                </div>

                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>
                        Special Delivery Information
                    </h3>
                    <p className='mb-4'>
                        For deliveries to Alaska, Hawaii, US territories,
                        APO/FPO addresses, and PO Boxes, we utilize USPS
                        services to ensure secure and timely delivery.
                    </p>
                    <ul className='list-disc pl-6 mb-4'>
                        <li>
                            <strong>USPS Carrier Delivery:</strong> USPS handles
                            deliveries to PO Boxes, APO/FPO addresses, and US
                            Territories.
                        </li>
                        <li>
                            <strong>Tracking:</strong> All domestic shipments
                            include delivery confirmation and tracking numbers.
                        </li>
                        <li>
                            <strong>Order Processing:</strong> Orders are
                            processed and shipped within 1-2 business days after
                            payment is confirmed.
                        </li>
                    </ul>
                </div>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    International Shipping
                </h2>
                <p className='mb-4'>
                    We are pleased to offer shipping to most countries
                    worldwide. International delivery costs are calculated based
                    on the weight of your order and may take up to 4-6 weeks.
                </p>

                <div className='bg-yellow-50 p-6 rounded-lg mb-6'>
                    <p className='mb-4'>
                        <strong>International Buyers – Please Note:</strong>{' '}
                        Import duties, taxes, and additional charges are not
                        included in the item price or shipping cost. These fees
                        are the buyer's responsibility.
                    </p>
                </div>

                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>
                        International Shipping Options:
                    </h3>

                    <div className='bg-white p-6 rounded-lg shadow-sm mb-4'>
                        <h4 className='font-semibold mb-2'>
                            International Standard Shipping
                        </h4>
                        <ul className='list-disc pl-6 mb-4'>
                            <li>Delivery Time: 4-6 weeks</li>
                            <li>Cost: $24.99</li>
                        </ul>
                    </div>

                    <div className='bg-white p-6 rounded-lg shadow-sm mb-4'>
                        <h4 className='font-semibold mb-2'>
                            International Express Shipping
                        </h4>
                        <ul className='list-disc pl-6 mb-4'>
                            <li>Delivery Time: 6-10 business days</li>
                            <li>Cost: $59.99</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    Additional Information
                </h2>

                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Tracking</h3>
                    <p className='mb-4'>
                        We provide tracking information for every order,
                        ensuring that both domestic and international shipments
                        can be monitored throughout their delivery journey.
                    </p>
                </div>

                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>
                        Customs and Regulations
                    </h3>
                    <p className='mb-4'>
                        Government regulations prohibit marking merchandise
                        below value or as "gifts". Please ensure compliance with
                        your country's import regulations.
                    </p>
                </div>

                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>
                        Delivery Confirmation and Tracking
                    </h3>
                    <ul className='list-disc pl-6 mb-4'>
                        <li>
                            <strong>Domestic Orders:</strong> All domestic
                            shipments come with a delivery confirmation and
                            tracking number for your convenience.
                        </li>
                        <li>
                            <strong>International Orders:</strong> Tracking is
                            available for Standard and Express shipping.
                        </li>
                    </ul>
                </div>

                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>
                        Order Processing
                    </h3>
                    <p className='mb-4'>
                        All orders are processed within 1-2 business days after
                        payment confirmation. You will receive a notification
                        once your order has been shipped.
                    </p>
                </div>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    Customer Support
                </h2>
                <p className='mb-4'>
                    If you have any questions or need assistance, please visit
                    our Contact Us page or check our FAQ section.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    Additional Resources
                </h2>
                <ul className='list-disc pl-6 mb-4'>
                    <li>Refunds & Returns</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>About Us</li>
                    <li>Shipping</li>
                </ul>
            </section>

            <div className='mb-8'>
                <p className='text-lg mb-4'>
                    We appreciate your understanding of our shipping policies
                    and fees as we strive to provide the best possible shopping
                    experience for our customers.
                </p>
            </div>
        </div>
    );
};

export default Shipping;
