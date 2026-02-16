'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WishlistRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/account/wishlist');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-200 dark:border-gray-800 border-t-black dark:border-t-white rounded-full animate-spin" />
        </div>
    );
}
