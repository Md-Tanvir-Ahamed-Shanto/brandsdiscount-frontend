const ApiError = ({ error }: { error?: { message: string } }) => {
    return (
        <div className='flex justify-center items-center'>
            <p className='text-red-500'>
                {error?.message || 'Failed to load. Please try again later.'}
            </p>
        </div>
    );
};

export default ApiError;
