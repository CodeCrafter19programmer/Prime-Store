'use client';

import Link from 'next/link';
import { Package, Clock, ChevronRight, Truck } from 'lucide-react';

export default function Account() {
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-gray-100 dark:border-gray-800 p-8 rounded-xl bg-gray-50/50 dark:bg-gray-900/20 hover:border-black dark:hover:border-white transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">Total Orders</h3>
                        <Package className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" size={24} strokeWidth={1.5} />
                    </div>
                    <p className="text-5xl font-bold tracking-tighter">12</p>
                </div>

                <div className="border border-gray-100 dark:border-gray-800 p-8 rounded-xl bg-orange-50/50 dark:bg-orange-900/10 hover:border-orange-500 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-orange-600/70 group-hover:text-orange-600 transition-colors">Pending</h3>
                        <Clock className="text-orange-300 group-hover:text-orange-500 transition-colors" size={24} strokeWidth={1.5} />
                    </div>
                    <p className="text-5xl font-bold tracking-tighter text-orange-600">2</p>
                </div>
            </div>

            {/* Recent Order Preview */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold uppercase tracking-wide">Recent Order</h2>
                    <Link href="/account/orders" className="text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors">
                        View All Orders <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="border border-gray-100 dark:border-gray-800 p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 dark:border-gray-800 pb-6 mb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-bold text-lg">Order #PRIME-8821</h3>
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2.5 py-1 font-bold uppercase rounded-full flex items-center gap-1">
                                    <Truck size={12} /> Delivered
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">Placed on Feb 6, 2026</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg">$165.00</p>
                            <p className="text-xs text-gray-500">2 Items</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-4">
                            <div className="w-16 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border-2 border-white dark:border-black flex items-center justify-center text-xs text-gray-400">Img 1</div>
                            <div className="w-16 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border-2 border-white dark:border-black flex items-center justify-center text-xs text-gray-400">Img 2</div>
                        </div>

                        <Link href="/account/orders" className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide hover:opacity-80 transition-opacity">
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
