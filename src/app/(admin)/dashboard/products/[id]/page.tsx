import Image from 'next/image';

interface Product {
    id: string;
    title: string;
    price: number;
    stock: number;
    color?: string;
    size?: string;
    category: string;
    desc: string;
    img: string;
}

const dummyProduct: Product = {
    id: '1',
    title: 'Astronaut Helmet',
    price: 99.99,
    stock: 5,
    color: 'White',
    size: 'One Size',
    category: 'Accessories',
    desc: 'A high-quality astronaut helmet replica.',
    img: '/astronaut.png'
};

const SingleProductPage = async ({
    params
}: {
    params: Promise<{ id: string }>;
}) => {
    // Simulating fetching the product by ID
    console.log(params);
    const product = dummyProduct;

    return (
        <div className='flex gap-12 mt-5'>
            {/* Product Info */}
            <div className='flex-1 bg-gray-100 p-5 rounded-lg font-bold text-gray-600'>
                <div className='relative w-full h-[300px] rounded-lg overflow-hidden mb-5'>
                    <Image
                        src={product.img}
                        alt={product.title}
                        fill
                        className='object-cover'
                    />
                </div>
                {product.title}
            </div>

            {/* Product Update Form */}
            <div className='flex-3 bg-gray-100 p-5 rounded-lg w-2/3'>
                <form className='flex flex-col'>
                    <input type='hidden' name='id' value={product.id} />

                    <label className='text-xs'>Title</label>
                    <input
                        type='text'
                        name='title'
                        placeholder={product.title}
                        className='p-3 border-2 border-gray-700 rounded-md bg-white text-black my-2'
                    />

                    <label className='text-xs'>Price</label>
                    <input
                        type='number'
                        name='price'
                        placeholder={product.price.toString()}
                        className='p-3 border-2 border-gray-700 rounded-md bg-white text-black my-2'
                    />

                    <label className='text-xs'>Stock</label>
                    <input
                        type='number'
                        name='stock'
                        placeholder={product.stock.toString()}
                        className='p-3 border-2 border-gray-700 rounded-md bg-white text-black my-2'
                    />

                    <label className='text-xs'>Color</label>
                    <input
                        type='text'
                        name='color'
                        placeholder={product.color || 'Enter color'}
                        className='p-3 border-2 border-gray-700 rounded-md bg-white text-black my-2'
                    />

                    <label className='text-xs'>Size</label>
                    <input
                        type='text'
                        name='size'
                        placeholder={product.size || 'Enter size'}
                        className='p-3 border-2 border-gray-700 rounded-md bg-white text-black my-2'
                    />

                    <label className='text-xs'>Category</label>
                    <select
                        name='category'
                        className='p-3 border-2 border-gray-700 rounded-md bg-white text-black my-2'
                    >
                        <option
                            value='accessories'
                            selected={product.category === 'Accessories'}
                        >
                            Accessories
                        </option>
                        <option value='clothing'>Clothing</option>
                    </select>

                    <label className='text-xs'>Description</label>
                    <textarea
                        name='desc'
                        rows={5}
                        placeholder={product.desc}
                        className='p-3 border-2 border-gray-700 rounded-md bg-white text-black my-2'
                    ></textarea>

                    <button className='w-full p-4 bg-teal-600 text-white rounded-md cursor-pointer mt-4'>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SingleProductPage;
