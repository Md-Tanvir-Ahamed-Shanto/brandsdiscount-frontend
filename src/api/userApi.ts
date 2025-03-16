import { baseApi, tagTypes } from '@/store';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: `/userroute/users`,
                method: 'GET'
            }),
            providesTags: [tagTypes.user]
        }) 
    })
});

export const {
    useGetAllUsersQuery
} = userApi;
