import { getBaseUrl } from '@/config';
import { axiosBaseQuery } from '@/helpers';
import { createApi } from '@reduxjs/toolkit/query/react';
import { publicTagTypesList } from '../Types';

// Public API without authentication
export const publicApi = createApi({
    reducerPath: 'publicApi',
    baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
    endpoints: () => ({}),
    tagTypes: publicTagTypesList
});
