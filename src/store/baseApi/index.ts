import { getBaseUrl } from '@/config';
import { axiosBaseQuery } from '@/helpers';
import { createApi } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from '../Types';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
    endpoints: () => ({
        //end points..
    }),
    tagTypes: tagTypesList
});
