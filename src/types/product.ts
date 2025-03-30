export interface ProductCardProps {
    image: string;
    brand: string;
    name: string;
    regularPrice: number;
    vipPrice: number;
    vipOffer: number;
    discount: number;
    rating: number;
    reviews: number;
    colors: string[];
}


export interface IProduct {
    id: string;
    title: string;
    brandName: string;
    color: string;
    sku: string;
    images: {
        id: string;
        url: string;
    }[];
    itemLocation: string;
    sizeId: string;
    sizeType: string | null;
    categoryId: string;
    subCategoryId: string | null;
    parentCategoryId: string | null;
    regularPrice: number;
    salePrice: number;
    platFormPrice: number | null;
    discountPercent: number;
    stockQuantity: number;
    condition: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    updatedById: string | null;
}
