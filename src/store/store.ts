import { configureStore, Middleware } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import { publicApi } from './publicApi';
import { reducer } from './rootReducer';

export const store = configureStore({
    reducer: {
        ...reducer,  // Spread the existing reducers
        [baseApi.reducerPath]: baseApi.reducer,  // Add the authenticated API reducer
        [publicApi.reducerPath]: publicApi.reducer,  // Add the public API reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware as Middleware, 
            publicApi.middleware as Middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
