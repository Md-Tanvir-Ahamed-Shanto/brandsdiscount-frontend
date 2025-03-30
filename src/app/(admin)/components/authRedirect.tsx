'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/dashboard-login');
        }
    }, [router]); // ✅ Ensure router is in the dependency array

    return null; // ✅ Return null instead of an empty fragment
};

export default AuthRedirect;
