'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function UserDashboard() {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();

            if (!data.session) {
                router.push('/auth/login');
            } else {
                setUserEmail(data.session.user.email);
                setLoading(false);
            }
        };

        checkSession();
    }, [router]);
    
    if (loading) {
        return <div className="p-6 text-center">Checking session...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
            <h1 className="text-3xl font-bold text-green-700 mb-4">
                Welcome, {userEmail} 👋
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