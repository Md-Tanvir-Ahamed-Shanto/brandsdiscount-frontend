'use client';
import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import { store } from '@/store/store';
import { Toster } from '@/lib';

interface IProps {
    children: ReactNode;
}

const ReduxProviders: FC<IProps> = ({ children }) => {
    return <Provider store={store}>{children}
    <Toster />
    </Provider>;
};

export default ReduxProviders;
