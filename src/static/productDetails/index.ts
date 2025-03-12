export interface IProduct {
    id: string;
    brand: string;
    name: string;
    price: number;
    offerPrice: number;
    image: string;
}

export const RECOMMENDED_PRODUCTS: IProduct[] = [
    {
        id: '1',
        brand: 'Epic Threads',
        name: 'Little & Big Girls Wide Leg Jeans',
        price: 5535.86,
        offerPrice: 2823.29,
        image: '/shop/one.webp'
    },
    {
        id: '2',
        brand: 'Epic Threads',
        name: 'Girls Riveria Wide Leg Jeans',
        price: 5535.86,
        offerPrice: 2823.29,
        image: '/shop/two.webp'
    },
    {
        id: '3',
        brand: 'Epic Threads',
        name: 'Little & Big Girls 2-Pc. Set',
        price: 6039.12,
        offerPrice: 3079.95,
        image: '/shop/three.webp'
    },
    {
        id: '4',
        brand: 'Epic Threads',
        name: 'Big Kids Rib Flare Pants',
        price: 3019.56,
        offerPrice: 1539.98,
        image: '/shop/four.webp'
    }
];
