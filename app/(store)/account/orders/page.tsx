'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Orders() {
    const orders = [
        { id: 'PRIME-8821', date: 'Feb 6, 2026', status: 'Delivered', total: '$165.00', items: 2, progress: 4 },
        { id: 'PRIME-8750', date: 'Jan 22, 2026', status: 'Processing', total: '$85.00', items: 1, progress: 2 },
        { id: 'PRIME-8620', date: 'Jan 15, 2026', status: 'Delivered', total: '$210.00', items: 3, progress: 4 },
    ];

    const progressSteps = ['Placed', 'Processing', 'Shipped', 'Delivered'];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400';
            case 'Processing':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-400';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="border border-gray-100 dark:border-gray-800 p-5 sm:p-6 rounded-lg bg-white dark:bg-gray-950 hover:shadow-sm transition-shadow"
                >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5 border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div>
                            <h3 className="font-bold text-base sm:text-lg">#{order.id}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <span className={`text-xs px-2.5 py-1 font-bold uppercase rounded-md ${getStatusStyles(order.status)}`}>
                                {order.status}
                            </span>
                            <span className="font-bold text-sm sm:text-base">{order.total}</span>
                        </div>
                    </div>

                    {/* Order Progress */}
                    <div className="flex items-center gap-0 mb-5 py-1">
                        {progressSteps.map((step, index) => {
                            const isCompleted = index < order.progress;
                            const isCurrent = index === order.progress - 1;
                            return (
                                <div key={step} className="flex items-center flex-1 last:flex-initial">
                                    <div className="flex flex-col items-center">
                                        <div className={`
                                            w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold transition-colors
                                            ${isCompleted
                                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                                : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                                            }
                                            ${isCurrent ? 'ring-2 ring-offset-2 ring-black dark:ring-white dark:ring-offset-black' : ''}
                                        `}>
                                            {isCompleted ? '✓' : index + 1}
                                        </div>
                                        <span className="text-[9px] sm:text-[10px] mt-1 text-gray-400 whitespace-nowrap hidden sm:block">
                                            {step}
                                        </span>
                                    </div>
                                    {index < progressSteps.length - 1 && (
                                        <div className={`flex-1 h-px mx-1 mb-0 sm:mb-3 ${isCompleted && index < order.progress - 1
                                            ? 'bg-black dark:bg-white'
                                            : 'bg-gray-200 dark:bg-gray-800'
                                            }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            {order.items} {order.items === 1 ? 'Item' : 'Items'}
                        </div>
                        <Link
                            href={`/account/orders/${order.id}`}
                            className="text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4 transition-colors"
                        >
                            View Order <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
