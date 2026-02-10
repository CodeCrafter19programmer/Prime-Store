'use client';

import Link from 'next/link';
import AccountSidebar from '@/components/AccountSidebar';
// LogOut, Heart, MapPin, User are likely not used now, but checking if Package is used.
// Looking at previous content of page.tsx lines 32-65, icons are NOT used in the main content part shown.
// So I can probably remove them. But to be safe and avoid "unused var" errors if I'm wrong about hidden code, I'll keep them or just ignore unused for now.
// Actually, I'll just keep the imports as is but add AccountSidebar to avoid breaking if I missed a usage.
import { useRouter } from 'next/navigation';
import { Package, User, MapPin, Heart, LogOut } from 'lucide-react';

export default function Account() {
    const router = useRouter();

    const handleSignOut = () => {
        // In a real app, clear auth tokens/session here
        router.push('/');
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">My Account</h1>
            <p className="text-gray-500 mb-12">Welcome back, John.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar / Menu */}
                {/* Sidebar / Menu */}
                <AccountSidebar />

                {/* Main Content: Overview */}
                <div className="md:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="border border-gray-100 dark:border-gray-800 p-8 rounded-sm">
                            <h3 className="font-bold text-lg uppercase tracking-wide mb-4">Total Orders</h3>
                            <p className="text-4xl font-bold">12</p>
                        </div>
                        <div className="border border-gray-100 dark:border-gray-800 p-8 rounded-sm">
                            <h3 className="font-bold text-lg uppercase tracking-wide mb-4">Pending</h3>
                            <p className="text-4xl font-bold text-orange-500">2</p>
                        </div>
                    </div>

                    {/* Recent Order Preview */}
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Recent Order</h2>
                        <div className="border border-gray-100 dark:border-gray-800 p-6 rounded-sm">
                            <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
                                <div>
                                    <p className="font-bold text-sm">#PRIME-8821</p>
                                    <p className="text-xs text-gray-500">Placed on Feb 6, 2026</p>
                                </div>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 font-bold uppercase rounded-sm">Delivered</span>
                            </div>
                            <div className="flex gap-4 mb-4">
                                <div className="w-16 h-20 bg-gray-200 dark:bg-gray-800 rounded-sm" />
                                <div className="w-16 h-20 bg-gray-200 dark:bg-gray-800 rounded-sm" />
                            </div>
                            <div className="text-right">
                                <Link href="/account/orders" className="text-sm font-bold text-black dark:text-white underline">View Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
