import * as React from 'react';

// This is the root page at http://localhost:3000
export default function HomePage() {
    return (
        // Full screen height with centered content and a gradient background
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700">
            <h1 className="text-white text-4xl font-bold">
                Tailwind is working!
            </h1>
        </div>
    )
}