import { baseApi, tagTypes } from '@/store';

const bulkApi = baseApi.injectEndpoints({
    endpoints: (build) => ({ 
        bulkUpdate: build.mutation({
            query: (data) => {  
              return {
                url: `/productroute/bulkupdate/sku`,
                method: "PATCH",
                data: data,
              };
            },
            invalidatesTags: [tagTypes.barcode],
        }) 
    })
});

export const {   
    useBulkUpdateMutation
} = bulkApi;
