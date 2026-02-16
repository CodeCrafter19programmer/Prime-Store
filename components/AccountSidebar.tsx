'use client';

import Link from 'next/link';
import { Package, User, MapPin, Heart, LogOut, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleSignOut = () => {
        logout(); // Clear session
        router.push('/');
    };

    const navItems = [
        { name: 'Overview', href: '/account', icon: User },
        { name: 'Orders', href: '/account/orders', icon: Package },
        { name: 'Addresses', href: '/account/addresses', icon: MapPin },
        { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
        { name: 'Settings', href: '/account/settings', icon: Settings },
    ];

    // Find active item, fallback for unknown routes inside account
    const activeItem = navItems.find(item => item.href === pathname) || { name: 'Menu', icon: User };

    return (
        <div className="w-full mb-8 lg:mb-0 bg-white dark:bg-black">
            {/* Mobile Dropdown Trigger */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                    <span className="flex items-center gap-3 font-bold uppercase text-sm tracking-wide">
                        {activeItem.icon && <activeItem.icon size={18} />} {activeItem.name}
                    </span>
                    {isMobileOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* Navigation List */}
            <div className={`space-y-2 ${isMobileOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="lg:sticky lg:top-32">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`flex items-center gap-3 p-4 transition-all rounded-lg text-sm uppercase tracking-wider ${isActive
                                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-lg transform scale-[1.02]'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white font-medium'
                                    }`}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} /> {item.name}
                            </Link>
                        );
                    })}

                    <div className="my-2 border-t border-gray-100 dark:border-gray-800 lg:my-4"></div>

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500 text-left rounded-lg text-sm uppercase tracking-wider font-bold"
                    >
                        <LogOut size={20} strokeWidth={2} /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
