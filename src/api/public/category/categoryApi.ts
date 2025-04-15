import { publicTagTypes } from '@/store';
import { publicApi } from '@/store/publicApi';

const categoryApi = publicApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCategoryApi: build.query({
            query: () => ({
                url: `/categoryroute/categories?parentCategoryId_null`,
                method: 'GET',
            }),
            providesTags: [publicTagTypes.category],
        }),
    }),
});

export const {  
  useGetAllCategoryApiQuery 
} = categoryApi;
