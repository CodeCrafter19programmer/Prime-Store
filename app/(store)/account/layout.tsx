'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import AccountSidebar from '@/components/AccountSidebar';

// Map routes to page titles & descriptions
const pageMeta: Record<string, { title: string; description: string }> = {
    '/account': { title: 'My Account', description: 'Welcome back.' },
    '/account/orders': { title: 'My Orders', description: 'View and track your order history.' },
    '/account/addresses': { title: 'Addresses', description: 'Manage your shipping and billing addresses.' },
    '/account/wishlist': { title: 'My Wishlist', description: 'Your curated collection of favorites.' },
    '/account/settings': { title: 'Account Settings', description: 'Manage your personal information and security.' },
};

export default function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, isLoading } = useAuth();

    // Protect Route
    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push('/login');
        }
    }, [isLoading, isLoggedIn, router]);

    // Don't render anything while checking auth or if not logged in
    if (isLoading || !isLoggedIn) {
        return null; // or a loading spinner
    }

    // Order detail pages (/account/orders/[id]) use a different layout
    const isOrderDetail = pathname.startsWith('/account/orders/') && pathname !== '/account/orders';

    // Get meta for current route (fallback for unknown routes)
    const meta = pageMeta[pathname] || { title: 'Account', description: '' };

    // Order detail has its own full-width layout with back navigation
    if (isOrderDetail) {
        return (
            <div className="pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="pb-20">
            <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-200px)]">

                {/* Sidebar - Sticky on Mobile & Desktop */}
                <AccountSidebar />

                {/* Main Content Area */}
                {/* min-w-0 ensures flex child shrinks properly, preventing frequent horizontal scroll issues */}
                <main className="flex-1 w-full min-w-0 px-4 sm:px-6 md:px-8 md:pl-12 pt-8 md:pt-0">

                    {/* Page Header */}
                    <div className="mb-6 md:mb-10 border-b border-gray-100 dark:border-gray-800 pb-4 md:pb-6">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-2 truncate">
                            {meta.title}
                        </h1>
                        {meta.description && (
                            <p className="text-gray-500 text-sm md:text-base line-clamp-2">
                                {meta.description}
                            </p>
                        )}
                    </div>

                    {/* Content Body */}
                    <div className="max-w-4xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
