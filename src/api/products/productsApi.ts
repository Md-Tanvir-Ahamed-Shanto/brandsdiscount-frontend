import { baseApi, tagTypes } from '@/store';

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => ({
                url: `/productroute/products`,
                method: 'GET'
            }),
            providesTags: [tagTypes.user]
        }),
        getSingleUser: build.query({
            query: (id) => ({
              url: `/userroute/user/${id}`,
              method: "GET", 
            }), 
            providesTags: [tagTypes.user], 
        }), 
        createUser: build.mutation({
            query: (data) => { 
              return {
                url: "/userroute/new",
                method: "POST",
                data: data,
              }
            },
            invalidatesTags: [tagTypes.user],
        }),
        updateSingleUser: build.mutation({
            query: ({ id, ...data }) => {  
              return {
                url: `/userroute/update/${id}`,
                method: "PATCH",
                data: data,
              };
            },
            invalidatesTags: [tagTypes.user],
          }),
        deleteSingleUser: build.mutation({
        query: (id) => ({
            url: `/userroute/delete/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: [tagTypes.user],  
        }),
    })
});

export const { 
} = productsApi;
