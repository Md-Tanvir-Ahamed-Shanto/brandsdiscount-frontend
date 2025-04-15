import { baseApi, tagTypes } from '@/store';

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: (page) => ({
                url: `/productroute/products?page=${page}&limit=10`,
                method: 'GET'
            }),
            providesTags: [tagTypes.product]
        }),
        getSingleProduct: build.query({
            query: (id) => ({
              url: `/productroute/product/${id}`,
              method: "GET", 
            }), 
            providesTags: [tagTypes.product], 
        }), 
        createProduct: build.mutation({
            query: (data) => { 
              return {
                url: "/productroute/new",
                method: "POST",
                data: data,
              }
            },
            invalidatesTags: [tagTypes.product],
        }),
        updateSingleProduct: build.mutation({
            query: ({ id, ...data }) => {  
              return {
                url: `/productroute/update/${id}`,
                method: "PATCH",
                data: data,
              };
            },
            invalidatesTags: [tagTypes.product],
          }),
        deleteSingleProduct: build.mutation({
        query: (id) => ({
            url: `/productroute/delete/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: [tagTypes.product],  
        }),
    })
});

export const { 
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateSingleProductMutation,
  useDeleteSingleProductMutation
} = productsApi;
