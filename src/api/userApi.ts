import { baseApi, tagTypes } from '@/store';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: `/CRUD`,
                method: 'GET'
            }),
            providesTags: [tagTypes.user]
        }),
        getSingleUser: build.query({
            query: (id) => ({
                url: `/CRUD/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.user]
        }),
        createUser: build.mutation({
            query: (createData) => ({
                url: '/CRUD',
                method: 'POST',
                body: createData
            }),
            invalidatesTags: [tagTypes.user]
        }),
        updateUser: build.mutation({
            query: ({ id, ...data }) => ({
                url: `/CRUD/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: [tagTypes.user]
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `/CRUD/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.user]
        })
    })
});

export const {
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;
