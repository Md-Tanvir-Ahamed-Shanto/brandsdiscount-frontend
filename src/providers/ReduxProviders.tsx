'use client';
import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import { persistor, store } from '@/store/store';
import { Toster } from '@/lib';
import { PersistGate } from 'redux-persist/integration/react';

interface IProps {
    children: ReactNode;
}

const ReduxProviders: FC<IProps> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
            <Toster />
        </Provider>
    );
};

export default ReduxProviders;
