'use client';

import Link from 'next/link';
import { Package, ArrowRight } from 'lucide-react';

export default function Account() {
    return (
        <div className="space-y-12">
            {/* Minimal Stat Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 sm:p-8 rounded-sm">
                    <p className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-2 text-gray-500">Orders</p>
                    <p className="text-3xl sm:text-4xl tracking-tight">12</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 sm:p-8 rounded-sm">
                    <p className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-2 text-gray-500">Pending</p>
                    <p className="text-3xl sm:text-4xl tracking-tight text-black dark:text-white">2</p>
                </div>
            </div>

            {/* Quick Preview of Last Order */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest">Latest Order</h2>
                    <Link href="/account/orders" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-2 group transition-colors">
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="border border-gray-100 dark:border-gray-800 p-6 sm:p-8 hover:border-black dark:hover:border-white transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-6 mb-6">
                        <div>
                            <p className="font-mono text-sm mb-1">PRIME-8821</p>
                            <p className="text-sm text-gray-500">Placed on Feb 6, 2026</p>
                        </div>
                        <div className="inline-block px-3 py-1.5 border border-black dark:border-white text-xs font-bold uppercase tracking-widest self-start">
                            Delivered
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                            <div className="w-16 h-20 bg-gray-100 dark:bg-gray-800 border border-white dark:border-black" />
                            <div className="w-16 h-20 bg-gray-200 dark:bg-gray-700 border border-white dark:border-black" />
                        </div>
                        <div className="text-sm text-gray-500">
                            +2 more items
                        </div>
                    </div>
                </div>
            </div>

            {/* Help / Support CTA */}
            <div className="bg-black text-white dark:bg-white dark:text-black p-8 sm:p-12 text-center">
                <h3 className="text-lg font-bold uppercase tracking-widest mb-3">Need Help?</h3>
                <p className="text-white/70 dark:text-black/70 mb-6 max-w-sm mx-auto">
                    Have a question about your order or our policies? We are available 24/7 to assist you.
                </p>
                <Link
                    href="/contact"
                    className="inline-block border border-white dark:border-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
