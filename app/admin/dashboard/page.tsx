'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function AdminDashboard() {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();

            const session = data.session;

            if (!session) {
                router.push('/auth/login');
                return;
            }

            const userRole = session.user?.user_metadata?.role;
            setUserEmail(session.user.email);
            setRole(userRole);

            // Only allow 'admin' role
            if (userRole !== 'admin') {
                router.push('/dashboard');
            } else {
                setLoading(false);
            }
        };
    
        checkSession();
    }, [router]);

    if (loading) {
        return <div className="p-6 text-center">Checking admin access...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Welcome Admin, {userEmail} 🛠️
        </h1>
        <button
            onClick={async () => {
            await supabase.auth.signOut();
            router.push('/auth/login');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
            Logout
        </button>
        </div>
    );
}