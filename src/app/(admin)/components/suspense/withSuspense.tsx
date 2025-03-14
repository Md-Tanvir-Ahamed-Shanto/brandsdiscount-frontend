import { Suspense, ComponentType } from 'react';

function withSuspense<T extends object>(
    Component: ComponentType<T>,
    fallback: React.ReactNode = <div>Loading...</div>
) {
    return function SuspenseWrapper(props: T) {
        return (
            <Suspense fallback={fallback}>
                <Component {...props} />
            </Suspense>
        );
    };
}

export default withSuspense;
