'use client';
import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import { store } from '@/store/store';

interface IProps {
    children: ReactNode;
}

const ReduxProviders: FC<IProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviders;
