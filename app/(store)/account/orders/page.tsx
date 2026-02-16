'use client';

import Link from 'next/link';
import { ChevronRight, Package, Truck, CheckCircle } from 'lucide-react';

export default function Orders() {
    const orders = [
        { id: '#PRIME-8821', date: 'Feb 6, 2026', status: 'Delivered', total: '$165.00', items: 2, image: '/product-1.jpg' },
        { id: '#PRIME-8750', date: 'Jan 22, 2026', status: 'Processing', total: '$85.00', items: 1, image: '/product-2.jpg' },
        { id: '#PRIME-8620', date: 'Jan 15, 2026', status: 'Delivered', total: '$210.00', items: 3, image: '/product-3.jpg' },
    ];

    const getStatusStep = (status: string) => {
        if (status === 'Delivered') return 4;
        if (status === 'Shipped') return 3;
        if (status === 'Processing') return 2;
        return 1;
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Order History</h2>
                <p className="text-gray-500 text-sm">Track your past and current orders.</p>
            </div>

            <div className="space-y-6">
                {orders.map((order) => {
                    const currentStep = getStatusStep(order.status);

                    return (
                        <div key={order.id} className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-black/50">
                            {/* Header */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 dark:border-gray-800">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{order.id}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Placed on {order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">{order.total}</p>
                                    <Link href={`/account/orders/${encodeURIComponent(order.id)}`} className="text-xs font-bold underline hover:text-gray-600 transition-colors">
                                        View Invoice
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex flex-col lg:flex-row gap-8 lg:items-center">

                                    {/* Thumbnails & Info */}
                                    <div className="flex-1 flex gap-6">
                                        <div className="flex -space-x-4">
                                            <div className="w-20 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-white dark:border-black flex items-center justify-center text-xs text-gray-400 font-medium">Img</div>
                                            {order.items > 1 && (
                                                <div className="w-20 h-24 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-white dark:border-black flex items-center justify-center text-xs text-gray-400 font-medium">
                                                    +{order.items - 1}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-sm font-bold mb-1">{order.status}</p>
                                            <p className="text-xs text-gray-500 mb-2">Arriving to <span className="text-black dark:text-white font-medium">Home</span></p>
                                            <Link href={`/account/orders/${encodeURIComponent(order.id)}`} className="text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline">
                                                Manage Order <ChevronRight size={14} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="flex-1 min-w-[300px]">
                                        <div className="relative">
                                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100 dark:bg-gray-800">
                                                <div
                                                    style={{ width: `${(currentStep / 4) * 100}%` }}
                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black dark:bg-white transition-all duration-1000"
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                <span className={currentStep >= 1 ? "text-black dark:text-white" : ""}>Placed</span>
                                                <span className={currentStep >= 2 ? "text-black dark:text-white" : ""}>Processing</span>
                                                <span className={currentStep >= 3 ? "text-black dark:text-white" : ""}>Shipped</span>
                                                <span className={currentStep >= 4 ? "text-green-600 dark:text-green-400" : ""}>Delivered</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
