'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import AccountSidebar from '@/components/AccountSidebar';

const pageMeta: Record<string, { title: string; description: string }> = {
    '/account': { title: 'Account Overview', description: 'Welcome back.' },
    '/account/orders': { title: 'Order History', description: 'View and track your previous orders.' },
    '/account/addresses': { title: 'Addresses', description: 'Manage your shipping and billing details.' },
    '/account/wishlist': { title: 'Wishlist', description: 'Your curated collection of favorites.' },
    '/account/settings': { title: 'Settings', description: 'Manage your personal information.' },
};

export default function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [isLoading, isLoggedIn, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-gray-200 dark:border-gray-800 border-t-black dark:border-t-white rounded-full animate-spin" />
                    <p className="text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Verifying Session</p>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return null;
    }

    const isOrderDetail = pathname.startsWith('/account/orders/') && pathname !== '/account/orders';
    const meta = pageMeta[pathname] || { title: 'Account', description: '' };

    if (isOrderDetail) {
        return (
            <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col md:flex-row md:items-start">

                <AccountSidebar />

                <main className="flex-1 w-full min-w-0">
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-2">
                            {meta.title}
                        </h1>
                        {meta.description && (
                            <p className="text-gray-500 text-sm md:text-base">
                                {meta.description}
                            </p>
                        )}
                    </div>

                    <div className="max-w-4xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
