import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import { publicApi } from './publicApi';
import { reducer } from './rootReducer'; 
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Only persist the cart slice
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'], // Only cart will be persisted
  };


  // Combine all reducers (including API and publicApi reducers)
const rootReducer = combineReducers({
    ...reducer,
});
  
  // Wrap with persistReducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);


  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Needed for redux-persist
      }).concat(
        baseApi.middleware as Middleware,
        publicApi.middleware as Middleware
      ),
  });
  
  export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
