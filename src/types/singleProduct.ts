import { ICategory, ISize } from './user';

export interface ISingleProductImage {
    id: string;
    url: string;
}

export interface ISingleProductVariant {
    id: string;
    color: string;
    sizeType: string;
    customSize: string;
    quantity: number;
    regularPrice: number;
    salePrice: number;
}


export interface ISingleProduct {
    id: string;
    title: string;
    brandName?: string;
    color?: string;
    sku: string;
    images: string[];
    itemLocation?: string;
    sizeId?: string;
    sizeType?: string;
    sizes?: string;
    categoryId?: string;
    subCategoryId?: string;
    parentCategoryId?: string;
    regularPrice?: number;
    salePrice?: number;
    toggleFirstDeal?: boolean;
    stockQuantity?: number;
    condition?: string;
    description?: string;
    status?: string;
    createdAt: string;
    updatedAt: string;
    updatedById?: string;
    ebayOne?: boolean;
    ebayTwo?: boolean;
    ebayThree?: boolean;
    size?: ISize;
    category?: ICategory;
    subCategory?: ICategory;
    parentCategory?: ICategory;
    variants?: ISingleProductVariant[];
}
