import { baseApi, tagTypes } from '@/store';

const orderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllOrder: build.query({
            query: (page) => ({
                url: `/order?page=${page | 1}&limit=2`,
                method: 'GET'
            }),
            providesTags: [tagTypes.order]
        }),
        getSingleOrder: build.query({
            query: (id) => ({
              url: `/order/${id}`,
              method: "GET", 
            }), 
            providesTags: [tagTypes.order], 
        }), 
        createOrder: build.mutation({
            query: (data) => { 
              return {
                url: "/order",
                method: "POST",
                data: data,
              }
            },
            invalidatesTags: [tagTypes.order],
        }),
        updateSingleOrder: build.mutation({
            query: ({ id, ...data }) => {  
              return {
                url: `/order/${id}`,
                method: "PUT",
                data: data,
              };
            },
            invalidatesTags: [tagTypes.order],
        }),
        deleteSingleOrder: build.mutation({
        query: (id) => ({
            url: `/productroute/order/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: [tagTypes.order],  
        }),
    })
});

export const {  
  useGetSingleOrderQuery,
  useGetAllOrderQuery,
  useCreateOrderMutation,
  useUpdateSingleOrderMutation,
  useDeleteSingleOrderMutation
} = orderApi;
