import { baseApi, tagTypes } from '@/store';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        /* updateUserProfile: build.mutation<any, any>({
            query: ({id, form}) => {  
                return {
                    url: `/userroute/update/659d408f-1cc1-471e-af2e-2b4cef939847`,
                    method: 'PUT',
                    body: form,
                };
            },
        }), */
        
        getSingleProfile: build.query({
            query: (id) => ({
                url: `/userroute/user/${id}`,
                method: "GET", 
            }), 
            providesTags: [tagTypes.profile], 
        }),  
        getAllProfileOrder: build.query({
            query: () => ({
                url: `/order/user/allOrders`,
                method: "GET", 
            }), 
            providesTags: [tagTypes.profile], 
        }),   
        updatePassword: build.mutation({
            query: ({ id, formData }) => {
                console.log(id);
                console.log(formData);   
                return {
                url: `/userroute/update/${id}`,
                method: "PUT",
                data: formData,
                };
            },
            invalidatesTags: [tagTypes.profile],
        }),
    })
});

export const {  
    useGetSingleProfileQuery,
    useGetAllProfileOrderQuery,
    useUpdatePasswordMutation
} = userApi;
