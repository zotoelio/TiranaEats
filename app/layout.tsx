import * as React from 'react';
import '../frontend/styles/globals.css';

export const metadata = {
    title: 'TiranaEats',
    description: 'Food ordering app for dine-in and takeout',
};

// This is the root layout component.
// All pages rendered by the App Router will be wrapped by this layout.
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-100 text-gray-900">
                {children}
            </body>
        </html>
    );
}