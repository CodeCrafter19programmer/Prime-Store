'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    MapPin,
    Heart,
    Settings,
    LogOut,
    ChevronRight,
    X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
    { name: 'Overview', href: '/account', icon: LayoutDashboard },
    { name: 'Orders', href: '/account/orders', icon: Package },
    { name: 'Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
    { name: 'Settings', href: '/account/settings', icon: Settings },
];

export default function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setIsExpanded(false);
    }, [pathname]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsExpanded(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when expanded on mobile
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <>
            {/* Mobile Expanded Drawer Overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsExpanded(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
                        />
                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 z-50 md:hidden flex flex-col shadow-2xl h-full"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                                <span className="font-bold uppercase tracking-wider">Account</span>
                                <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Drawer Navigation */}
                            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsExpanded(false)}
                                            className={`
                                                flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                                                ${isActive
                                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}
                                            `}
                                        >
                                            <Icon size={20} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Sign Out */}
                            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-3 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <LogOut size={20} />
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Persistent Sidebar (Sticky) */}
            {/* Mobile: 70px Icon Strip. Desktop: Full 64 Sidebar */}
            <aside
                className={`
                    sticky top-28 z-30
                    flex flex-col
                    bg-white dark:bg-black
                    border-r border-gray-200 dark:border-gray-800
                    h-[calc(100vh-7rem)] /* Fits below navbar (h-28 = 7rem) */
                    flex-shrink-0
                    transition-all duration-300 ease-in-out
                    w-[70px] md:w-64
                `}
            >
                {/* Mobile Toggle Handle (Only visible on mobile strip) */}
                <div className="md:hidden absolute -right-3 top-6 z-40">
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-md text-gray-500 hover:text-black dark:hover:text-white flex items-center justify-center transform hover:scale-105 transition-transform"
                        aria-label="Expand menu"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-x-hidden">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsExpanded(false)} // No-op on desktop, useful if reusing logic
                                className={`
                                    group flex items-center gap-4 px-3 py-3 rounded-lg
                                    transition-all duration-200
                                    ${isActive
                                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white'
                                    }
                                `}
                                title={item.name}
                            >
                                {/* Icon is always visible */}
                                <div className="min-w-[24px] flex justify-center flex-shrink-0">
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                </div>

                                {/* Text - Hidden on mobile, Visible on Desktop */}
                                <span className={`
                                    font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300
                                    hidden md:block opacity-100 flex-1 truncate
                                `}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sign Out - Bottom */}
                <div className="p-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-3 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group overflow-hidden"
                        title="Sign Out"
                    >
                        <div className="min-w-[24px] flex justify-center flex-shrink-0">
                            <LogOut size={20} />
                        </div>
                        <span className="font-medium text-sm whitespace-nowrap hidden md:block flex-1 text-left truncate">
                            Sign Out
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
}
