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
                console.log('API call with params:', { page, limit, sort, filters });
                return {
                    url: `/api/products/all?page=${page}&limit=${limit}&sortPrice=${sort}${filters ? `&${filters}` : '' }${sizes ? `&sizeType=${sizes}` : ''}`,
                    method: 'GET',
                };
            },
            providesTags: [publicTagTypes.products],
            keepUnusedDataFor: 60, // optional: cache data for 60s
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
        }), 
        getAllSearchProduct: build.query<ISingleProduct, { searchTerm: string, limit?: number, page?: number }>({            query: ({ searchTerm, limit = 30, page = 1 }) => {
                console.log('Search API call with params:', { searchTerm, limit, page });
                return {
                    url: `/api/products/all?searchTerm=${searchTerm}&limit=${limit}&page=${page}${sizes ? `&sizeType=${sizes}` : ''}`,
                    method: 'GET',
                };
            },
            providesTags: [publicTagTypes.products],
            keepUnusedDataFor: 60, // optional: cache data for 60s
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
