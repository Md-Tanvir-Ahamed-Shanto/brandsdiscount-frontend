import { publicTagTypes } from '@/store';
import { publicApi } from '@/store/publicApi';

const sizeApi = publicApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSizes: build.query({
            query: () => ({
                url: `/sizeroute/sizes`,
                method: 'GET',
            }),
            providesTags: [publicTagTypes.size],
        }),
    }),
});

export const {  
  useGetAllSizesQuery, 
} = sizeApi;
