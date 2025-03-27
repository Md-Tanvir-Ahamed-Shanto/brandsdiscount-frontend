import { baseApi, tagTypes } from '@/store';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: (page) => ({
                url: `/userroute/users?page=${page | 1}&limit=2`,
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
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useCreateUserMutation,
    useUpdateSingleUserMutation,
    useDeleteSingleUserMutation
} = userApi;
