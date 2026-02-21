'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    MapPin,
    Heart,
    Settings,
    LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navigation = [
    { name: 'Overview', href: '/account', icon: LayoutDashboard },
    { name: 'Orders', href: '/account/orders', icon: Package },
    { name: 'Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
    { name: 'Settings', href: '/account/settings', icon: Settings },
];

export default function AccountSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <>
            {/* Mobile Horizontal Navigation */}
            <nav className="md:hidden flex overflow-x-auto hide-scrollbar border-b border-gray-200 dark:border-gray-800 -mx-4 px-4 sm:-mx-6 sm:px-6 mb-8">
                <div className="flex gap-6 pb-4 min-w-max">
                    {navigation.map((item) => {
                        const isActive = item.href === '/account' ? pathname === '/account' : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    relative text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors
                                    ${isActive
                                        ? 'text-black dark:text-white'
                                        : 'text-gray-400 hover:text-black dark:hover:text-white'}
                                `}
                            >
                                {item.name}
                                {isActive && (
                                    <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-black dark:bg-white" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Desktop Sticky Sidebar */}
            <aside className="hidden md:flex flex-col w-64 flex-shrink-0 mr-12 sticky top-32 h-[calc(100vh-8rem)]">
                <nav className="flex-1 flex flex-col gap-2">
                    {navigation.map((item) => {
                        const isActive = item.href === '/account' ? pathname === '/account' : pathname.startsWith(item.href);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    group flex items-center gap-4 px-4 py-3.5 rounded-md
                                    transition-colors
                                    ${isActive
                                        ? 'bg-black dark:bg-white text-white dark:text-black'
                                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white'
                                    }
                                `}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="font-bold uppercase tracking-widest text-xs">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mb-12 border-t border-gray-100 dark:border-gray-800 pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-bold uppercase tracking-widest text-xs">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

