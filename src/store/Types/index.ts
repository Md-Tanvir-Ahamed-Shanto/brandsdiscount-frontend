// tagTypes for caching, refetching

export enum tagTypes {
    user = 'user',
    size = 'size',
    category = 'category',
    product = 'product',
    order = 'order',
    profile = 'profile',
}

export const tagTypesList = [tagTypes.user, tagTypes.size, tagTypes.category, tagTypes.product, tagTypes.order, tagTypes.profile];

export enum publicTagTypes {
    products = 'products', 
    size = 'size', 
}

export const publicTagTypesList = [publicTagTypes.products, publicTagTypes.size];
