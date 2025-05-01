'use client';

import * as React from 'react';
import { useState } from "react";
import { supabase } from '../../../lib/supabaseClient';

export default function SignUpPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    // Placeholder signup handler — will connect to Supabase later
    const handleSignup = async (e: React.FormEvent) => {

        e.preventDefault();

        // Validate password match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        // Reset any previous error
        setError('');
        
        // Call Supabase signUp
        const { data, error: signupError } = await supabase.auth.signUp({
            email,
            password,
            options: {
            data: { role }, //store user role in metadata
            }
        });

        if (signupError) {
            setError(signupError.message);
            return;
        }
        
        // Optional: show success, redirect, etc.
        alert('Signup successful! Please check your email to confirm your account.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSignup}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up for TiranaEats</h2>
        
                {/* Dropdown to select role (user or admin) */}
                <div className="mb-4">
                <label className="block mb-1 font-medium">Sign up as</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
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

                {/* Confirm password field */}
                <div className="mb-6">
                <label className="block mb-1 font-medium">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
                </div>
        
                {/* Submit button */}
                <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                Sign Up
                </button>

                {/* Already have an account? */}
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <a
                        href="/auth/login"
                        className="text-green-600 hover:underline font-medium"
                        >
                        Log in
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}