'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "../../../lib/supabaseClient";
import { useState } from "react";

export default function LoginPage() {
    
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[role, setRole] = useState('user');
    const [error, setError] = useState('');
    const router = useRouter();

    // Placeholder login handler — you'll connect this to Supabase later
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error state
        setError('');

        // Call Supabase to log in with email and password
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            setError(loginError.message);
            return;
        }

        // Optional: check user role from metadata
        const userRole = data.user?.user_metadata?.role;

        if (userRole === 'admin') {
        router.push('/admin/dashboard');
        } else {
        router.push('/dashboard');
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login to TiranaEats</h2>

                {/* Error message */}
                {error && (
                <div className="mb-4 text-red-600 font-medium text-sm">
                    {error}
                </div>
                )}

                {/* Dropdown to select role (user or restaurant owner) */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Login as</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    <option value="user">User</option>
                    <option value="owner">Restaurant Owner</option>
                    </select>
                </div>

                {/* Email input field */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Password input field */}
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                    Log In
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Don't have an account?{' '}
                        <a
                        href="/auth/signup"
                        className="text-indigo-600 hover:underline font-medium"
                        >
                        Sign up
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}