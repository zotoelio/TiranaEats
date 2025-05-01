'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is the root page at http://localhost:3000
export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to login page when visiting root route
        router.push('/auth/login');
    }, [router]);

    return null;
}