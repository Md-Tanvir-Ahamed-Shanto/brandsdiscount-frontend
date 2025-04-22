import { publicTagTypes } from '@/store';
import { publicApi } from '@/store/publicApi';

const barCodeApi = publicApi.injectEndpoints({
    endpoints: (build) => ({
        getSkuProduct: build.query({
            query: (id) => ({
                url: `/productroute/product/sku/${id}`,
                method: 'GET',
            }),
            providesTags: [publicTagTypes.barcode],
        }),
    }),
});

export const {  
  useGetSkuProductQuery, 
} = barCodeApi;
