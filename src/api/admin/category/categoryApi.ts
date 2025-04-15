import { baseApi, tagTypes } from '@/store';

const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCategory: build.query({
            query: (page) => ({
                url: `/categoryroute/categories?page=${page}&limit=10`,
                method: 'GET'
            }),
            providesTags: [tagTypes.category]
        }),
        getSingleCategory: build.query({
            query: (id) => ({
              url: `/categoryroute/category/${id}`,
              method: "GET", 
            }), 
            providesTags: [tagTypes.category], 
        }), 
        createCategory: build.mutation({
            query: (data) => { 
              return {
                url: "/categoryroute/new",
                method: "POST",
                data: data,
              }
            },
            invalidatesTags: [tagTypes.category],
        }),
        updateSingleCategory: build.mutation({
            query: ({ id, ...data }) => {  
              return {
                url: `/categoryroute/update/${id}`,
                method: "PUT",
                data: data,
              };
            },
            invalidatesTags: [tagTypes.category],
          }),
        deleteSingleCategory: build.mutation({
        query: (id) => ({
            url: `/categoryroute/delete/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: [tagTypes.category],  
        }),
    })
});

export const {  
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateSingleCategoryMutation,
  useDeleteSingleCategoryMutation
} = categoryApi;
