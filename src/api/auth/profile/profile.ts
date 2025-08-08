import { baseApi, tagTypes } from '@/store';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleProfile: build.query({
            query: (id) => ({
                url: `/userroute/user/${id}`,
                method: "GET", 
            }), 
            providesTags: [tagTypes.profile],
            transformErrorResponse: (response: { status: number }) => {
                if (response.status === 401) {
                    return { error: 'Authentication required' };
                }
                return response;
            },
        }),  
        getAllProfileOrder: build.query({
            query: () => ({
                url: `/order/me`,
                method: "GET", 
            }), 
            providesTags: [tagTypes.profile],
            transformErrorResponse: (response: { status: number }) => {
                if (response.status === 401) {
                    return { error: 'Authentication required' };
                }
                return response;
            },
        }),   
        updatePassword: build.mutation({
            query: ({ id, formData }) => ({
                url: `/userroute/update/${id}`,
                method: "PUT",
                data: formData,
            }),
            invalidatesTags: [tagTypes.profile],
            transformErrorResponse: (response: { status: number }) => {
                if (response.status === 401) {
                    return { error: 'Authentication required' };
                }
                return response;
            },
        }),
    })
});

export const {  
    useGetSingleProfileQuery,
    useGetAllProfileOrderQuery,
    useUpdatePasswordMutation
} = userApi;
