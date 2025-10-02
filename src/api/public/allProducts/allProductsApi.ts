/* eslint-disable @typescript-eslint/no-explicit-any */
import { publicTagTypes } from '@/store';
import { publicApi } from '@/store/publicApi';
import { ISingleProduct } from '@/types';

const sizes = JSON.parse(localStorage.getItem("selected_sizes") || "[]");

console.log("seach size",sizes)

const allProductsApi = publicApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPublicProduct: build.query({
            query: ({ page = 1, limit = 100, sort = 'createdAt_desc', filters = '' }) => {
                // Remove console.log in production for better performance
                if (process.env.NODE_ENV !== 'production') {
                    console.log('API call with params:', { page, limit, sort, filters });
                }
                return {
                    url: `/api/products/all?page=${page}&pageSize=${limit}&sortPrice=${sort}${filters ? `&${filters}` : '' }${sizes ? `&sizeType=${sizes}` : ''}`,
                    method: 'GET',
                };
            },
            providesTags: (result, error, arg) => {
                // More granular tag structure for better cache invalidation
                const baseTags = [
                    { type: publicTagTypes.products, id: `page_${arg.page}_limit_${arg.limit}_sort_${arg.sort}_filters_${arg.filters}` },
                    { type: publicTagTypes.products, id: 'LIST' }
                ];
                
                // Add individual product tags if we have results
                const productTags = result?.products
                    ? result.products.map((product: { id: any; }) => ({ 
                        type: publicTagTypes.products, 
                        id: product.id 
                      }))
                    : [];
                    
                return [...baseTags, ...productTags];
            },
            // Increase cache time for better performance
            keepUnusedDataFor: 300, // cache data for 5 minutes
            // Add stale-while-revalidate behavior
            serializeQueryArgs: ({ queryArgs }) => {
                const { page, limit, sort, filters } = queryArgs;
                return `products_${page}_${limit}_${sort}_${filters}`;
            },
        }), 
        getSinglePublicProduct: build.query<ISingleProduct, string>({
            query: (id) => ({
            url: `/api/products/${id}`,
            method: 'GET',
            }),
        }),
        getMayLikeProducts: build.query<any, string>({
            query: (id) => ({
            url: `/api/products/all?filtering=categoryId_${id}`,
            method: 'GET',
            }),
        }),
        getNewTrendingProducts: build.query({
            query: () => ({
                url: `/api/products/all?filter_createdAt_desc`,
                method: 'GET',
            }),
            keepUnusedDataFor: 600, // Cache trending products for 10 minutes
            providesTags: [{ type: publicTagTypes.products, id: 'TRENDING' }],
        }), 
        getAllSearchProduct: build.query<ISingleProduct, { searchTerm: string, limit?: number, page?: number, sort?: string }>({            
            query: ({ searchTerm, limit = 30, page = 1, sort = 'createdAt_desc' }) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.log('Search API call with params:', { searchTerm, limit, page, sort });
                }
                return {
                    url: `/api/products/all?searchTerm=${searchTerm}&pageSize=${limit}&page=${page}&sortPrice=${sort}${sizes ? `&sizeType=${sizes}` : ''}`,
                    method: 'GET',
                };
            },
            providesTags: (result, error, arg) => {
                // More granular tag structure for better cache invalidation
                const baseTags = [
                    { type: publicTagTypes.products, id: `search_${arg.searchTerm}_page_${arg.page}_limit_${arg.limit}_sort_${arg.sort}` },
                    { type: publicTagTypes.products, id: 'SEARCH_LIST' }
                ];
                
                // Add individual product tags if we have results
                const productTags = (result as any)?.products
                    ? (result as any).products.map((product: { id: any; }) => ({ 
                        type: publicTagTypes.products, 
                        id: product.id 
                      }))
                    : [];
                    
                return [...baseTags, ...productTags];
            },
            // Increase cache time for better performance
            keepUnusedDataFor: 300, // cache data for 5 minutes
            // Add stale-while-revalidate behavior
            serializeQueryArgs: ({ queryArgs }) => {
                const { searchTerm, page, limit, sort } = queryArgs;
                return `search_${searchTerm}_${page}_${limit}_${sort}`;
            },
        }),
    }),
});

export const {  
  useGetAllPublicProductQuery, 
  useGetSinglePublicProductQuery,
  useGetMayLikeProductsQuery,
  useGetNewTrendingProductsQuery,
  useGetAllSearchProductQuery
} = allProductsApi;
