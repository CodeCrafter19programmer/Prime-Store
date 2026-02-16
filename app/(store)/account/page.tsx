'use client';

import Link from 'next/link';

export default function Account() {
    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="border border-gray-100 dark:border-gray-800 p-6 sm:p-8 rounded-lg bg-white dark:bg-gray-950 hover:shadow-sm transition-shadow">
                    <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 text-gray-500">
                        Total Orders
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold">12</p>
                </div>
                <div className="border border-gray-100 dark:border-gray-800 p-6 sm:p-8 rounded-lg bg-white dark:bg-gray-950 hover:shadow-sm transition-shadow">
                    <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider mb-3 text-gray-500">
                        Pending
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-orange-500">2</p>
                </div>
            </div>

            {/* Recent Order Preview */}
            <div>
                <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide mb-4 sm:mb-6">
                    Recent Order
                </h2>
                <div className="border border-gray-100 dark:border-gray-800 p-5 sm:p-6 rounded-lg bg-white dark:bg-gray-950">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start border-b border-gray-100 dark:border-gray-800 pb-4 mb-4 gap-2">
                        <div>
                            <p className="font-bold text-sm">#PRIME-8821</p>
                            <p className="text-xs text-gray-500">Placed on Feb 6, 2026</p>
                        </div>
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 text-xs px-2.5 py-1 font-bold uppercase rounded-md self-start">
                            Delivered
                        </span>
                    </div>

                    {/* Order Progress */}
                    <div className="flex items-center gap-0 mb-5 py-2">
                        {['Placed', 'Processing', 'Shipped', 'Delivered'].map((step, index) => (
                            <div key={step} className="flex items-center flex-1 last:flex-initial">
                                <div className="flex flex-col items-center">
                                    <div className={`
                                        w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold
                                        bg-black text-white dark:bg-white dark:text-black
                                    `}>
                                        ✓
                                    </div>
                                    <span className="text-[10px] sm:text-xs mt-1.5 text-gray-500 whitespace-nowrap">
                                        {step}
                                    </span>
                                </div>
                                {index < 3 && (
                                    <div className="flex-1 h-px bg-black dark:bg-white mx-1 sm:mx-2 mb-4" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 mb-4">
                        <div className="w-14 h-18 sm:w-16 sm:h-20 bg-gray-100 dark:bg-gray-800 rounded-md" />
                        <div className="w-14 h-18 sm:w-16 sm:h-20 bg-gray-100 dark:bg-gray-800 rounded-md" />
                    </div>
                    <div className="text-right">
                        <Link
                            href="/account/orders"
                            className="text-sm font-bold text-black dark:text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
                        >
                            View Details →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
