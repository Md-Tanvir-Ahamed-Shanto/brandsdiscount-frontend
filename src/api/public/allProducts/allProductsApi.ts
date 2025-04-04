import { publicTagTypes } from '@/store';
import { publicApi } from '@/store/publicApi';

const allProductsApi = publicApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPublicProduct: build.query({
            query: ({ page = 1, limit = 10, sort = 'createdAt_desc', filters = '' }) => ({
                url: `/productroute/products?page=${page}&limit=${limit}&sort=${sort}${filters ? `&${filters}` : ''}`,
                method: 'GET',
            }),
            providesTags: [publicTagTypes.products],
        }), 
    }),
});

export const {  
  useGetAllPublicProductQuery, 
} = allProductsApi;
