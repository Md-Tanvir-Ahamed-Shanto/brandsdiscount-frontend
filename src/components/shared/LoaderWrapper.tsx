import React from 'react';
import FullLoading from './FullLoading';
import ApiError from './ApiError';

interface LoaderWrapperProps {
    isLoading: boolean;
    isError: boolean;
    error?: { message: string };
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({
    isLoading,
    isError,
    error
}) => {
    if (isLoading) return <FullLoading />;
    if (isError) return <ApiError error={error} />;

    return <></>;
};

export default LoaderWrapper;
