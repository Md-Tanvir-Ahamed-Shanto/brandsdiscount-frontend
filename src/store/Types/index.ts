// tagTypes for caching, refetching

export enum tagTypes {
    user = 'user',
    size = 'size',
    category = 'category',
    product = 'product',
    order = 'order',
    profile = 'profile',
    barcode = 'barcode',
}

export const tagTypesList = [tagTypes.user, tagTypes.size, tagTypes.category, tagTypes.product, tagTypes.order, tagTypes.profile, tagTypes.barcode];

export enum publicTagTypes {
    products = 'products', 
    size = 'size', 
    category = 'category', 
    barcode = 'barcode', 
}

export const publicTagTypesList = [publicTagTypes.products, publicTagTypes.size, publicTagTypes.category, publicTagTypes.barcode];
