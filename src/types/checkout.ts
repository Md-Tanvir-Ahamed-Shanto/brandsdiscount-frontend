export interface ICheckoutProduct {
    id: string;
    brand: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    size: string;
    color: string;
    webId: string;
    image: string;
    quantity: number;
}