'use client';

import Link from 'next/link';
import { Package, User, MapPin, Heart, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const handleSignOut = () => {
        logout(); // Clear session
        router.push('/');
    };

    const navItems = [
        { name: 'Overview', href: '/account', icon: User },
        { name: 'Orders', href: '/account/orders', icon: Package },
        { name: 'Addresses', href: '/account/addresses', icon: MapPin },
        { name: 'Wishlist', href: '/wishlist', icon: Heart },
    ];

    return (
        <div className="space-y-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 p-4 transition-colors font-medium ${isActive
                            ? 'bg-gray-50 dark:bg-gray-900 border-l-4 border-black dark:border-white'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 hover:text-black dark:hover:text-white'
                            }`}
                    >
                        <item.icon size={20} /> {item.name}
                    </Link>
                );
            })}

            <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-red-500 text-left"
            >
                <LogOut size={20} /> Sign Out
            </button>
        </div>
    );
}
