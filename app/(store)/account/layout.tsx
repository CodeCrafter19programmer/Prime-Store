'use client';

import AccountSidebar from '@/components/AccountSidebar';
import { usePathname } from 'next/navigation';

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // We can use pathname to determine showing a title if needed, but the pages have their own H1s.
    // However, UIPolish.md says "Use a single Account Dashboard Layout".
    // Usually the H1 "My Account" stays constant?
    // The current pages have "My Account", "My Orders", "Account Settings".
    // I will let the pages render their specific H1s, but manage the grid here.

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
            <div className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">My Account</h1>
                <p className="text-gray-500">Welcome back, John.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Sidebar - Takes 1 column */}
                <div className="lg:col-span-1">
                    <AccountSidebar />
                </div>

                {/* Main Content - Takes 3 columns */}
                <main className="lg:col-span-3">
                    {children}
                </main>
            </div>
        </div>
    );
}
