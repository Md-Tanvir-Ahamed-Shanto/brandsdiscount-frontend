import LoadingSpinner from './LoadingSpinner';

const FullLoading = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'>
            <LoadingSpinner className='w-12 h-12 border-4 border-white' />
        </div>
    );
};

export default FullLoading;
