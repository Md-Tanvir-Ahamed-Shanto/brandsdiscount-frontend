import { baseApi, tagTypes } from '@/store';

const sizeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSizes: build.query({
            query: (page) => ({
                url: `/sizeroute/sizes?page=${page}&limit=10`,
                method: 'GET'
            }),
            providesTags: [tagTypes.size]
        }),
        getSingleSize: build.query({
            query: (id) => ({
              url: `/sizeroute/size/${id}`,
              method: "GET", 
            }), 
            providesTags: [tagTypes.size], 
        }), 
        createSize: build.mutation({
            query: (data) => { 
              return {
                url: "/sizeroute/new",
                method: "POST",
                data: data,
              }
            },
            invalidatesTags: [tagTypes.size],
        }),
        updateSingleSize: build.mutation({
            query: ({ id, ...data }) => {  
              return {
                url: `/sizeroute/update/${id}`,
                method: "PUT",
                data: data,
              };
            },
            invalidatesTags: [tagTypes.size],
          }),
        deleteSingleSize: build.mutation({
        query: (id) => ({
            url: `/sizeroute/delete/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: [tagTypes.size],  
        }),
    })
});

export const { 
  useGetAllSizesQuery,
  useGetSingleSizeQuery,
  useCreateSizeMutation,
  useUpdateSingleSizeMutation,
  useDeleteSingleSizeMutation
} = sizeApi;
