import React from 'react';

const Faq = () => {
    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6'>
                Frequently Asked Questions (FAQs)
            </h1>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    What is Brands Discounts?
                </h2>
                <p className='mb-4'>
                    Brands Discounts is an online store offering high-quality
                    clothing, shoes, accessories, and more at discounted prices.
                    All our brand name products are authentic and sourced
                    directly from authorized distributors, ensuring you receive
                    genuine items from top designer brands.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    How do I place an order?
                </h2>
                <p className='mb-4'>
                    Simply browse our website, select the items you wish to
                    purchase, and add them to your cart. When ready, proceed to
                    checkout, provide your shipping details, and choose a
                    payment method to complete your order.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    What payment methods do you accept?
                </h2>
                <p className='mb-4'>
                    We accept major credit cards (Visa, MasterCard, American
                    Express), PayPal, and other secure payment methods for your
                    convenience.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    Where do you ship, and what is the cost of shipping?
                </h2>
                <p className='mb-4'>
                    We offer both Domestic and International shipping options to
                    cater to our customers' diverse needs:
                </p>

                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>
                        Domestic Shipping (Within the United States)
                    </h3>
                    <ul className='list-disc pl-6 mb-4'>
                        <li>Standard Shipping: $9.95 flat rate</li>
                        <li>Free Shipping: Available on orders over $49</li>
                        <li>Delivery Time: 3-7 business days</li>
                    </ul>
                    <p className='mb-4'>
                        For deliveries to Alaska, Hawaii, US territories,
                        APO/FPO addresses, and PO Boxes, we utilize USPS
                        services to ensure secure and timely delivery. All
                        domestic shipments include delivery confirmation and
                        tracking numbers.
                    </p>
                </div>

                <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>
                        International Shipping
                    </h3>
                    <ul className='list-disc pl-6 mb-4'>
                        <li>International Standard Shipping: $24.99</li>
                        <li>Delivery Time: Up to 4-6 weeks</li>
                        <li>International Express Shipping: $59.99</li>
                        <li>Delivery Time: 6-10 business days</li>
                    </ul>
                </div>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    What is your return policy?
                </h2>
                <p className='mb-4'>
                    We want you to be completely satisfied with your purchase.
                    If you are not, we accept returns within 10 days of the
                    order leaving our warehouse. All items must be returned in
                    new, unused condition with original tags attached. For more
                    details, please visit our Refund & Returns page.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    How do I initiate a return or exchange?
                </h2>
                <p className='mb-4'>
                    To return or exchange an item, please visit our Refund &
                    Returns page and follow the instructions provided. A return
                    shipping fee of $9.95 will be deducted from your refund if
                    using our prepaid shipping label for domestic orders. For
                    international orders, a return shipping fee of $24.99 will
                    be deducted. Exchanges are allowed if the new item order is
                    placed within the return label window.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    How long does it take to receive a refund?
                </h2>
                <p className='mb-4'>
                    Refunds are processed within 7-10 business days after we
                    receive and inspect the returned item. A confirmation email
                    will be sent once your refund is processed.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    What should I do if I receive a damaged or incorrect item?
                </h2>
                <p className='mb-4'>
                    If you receive a damaged or incorrect item, please contact
                    our Customer Service team within 48 hours of receiving your
                    order. Visit our Contact Us page for more details on how to
                    reach us.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    How can I contact customer service?
                </h2>
                <p className='mb-4'>
                    You can reach our customer service team via our Contact Us
                    page for any inquiries or assistance.
                </p>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-4'>
                    What are your privacy and terms of service policies?
                </h2>
                <p className='mb-4'>
                    Your privacy is important to us. Please review our Privacy
                    Policy and Terms of Service to learn more about how we
                    handle your personal information and our service agreements.
                </p>
            </section>
        </div>
    );
};

export default Faq;
