import { ICategory, ISize } from './user';

export interface ISingleProductImage {
    id: string;
    url: string;
}
export interface ISingleProduct {
    id: string;
    title: string;
    brandName: string;
    color: string;
    sku: string;
    images: ISingleProductImage[];
    itemLocation: string;
    sizeId: string | null;
    sizeType: string;
    categoryId: string | null;
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
    updatedById: string;
    size: ISize;
    category: ICategory;
    parentCategory: ICategory | null;
}
