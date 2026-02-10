'use client';

import Link from 'next/link';
import AccountSidebar from '@/components/AccountSidebar';
import { Package, User, MapPin, Heart, LogOut, ChevronRight } from 'lucide-react';

export default function Orders() {
    const orders = [
        { id: '#PRIME-8821', date: 'Feb 6, 2026', status: 'Delivered', total: '$165.00', items: 2 },
        { id: '#PRIME-8750', date: 'Jan 22, 2026', status: 'Processing', total: '$85.00', items: 1 },
        { id: '#PRIME-8620', date: 'Jan 15, 2026', status: 'Delivered', total: '$210.00', items: 3 },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">My Orders</h1>
            <p className="text-gray-500 mb-12">View and track your order history.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar / Menu */}
                {/* Sidebar / Menu */}
                <AccountSidebar />

                {/* Main Content: Orders List */}
                <div className="md:col-span-2 space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-100 dark:border-gray-800 p-6 rounded-sm hover:shadow-sm transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b border-gray-50 dark:border-gray-900 pb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{order.id}</h3>
                                    <p className="text-xs text-gray-500">{order.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-xs px-2 py-1 font-bold uppercase rounded-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                    <span className="font-bold">{order.total}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    {order.items} {order.items === 1 ? 'Item' : 'Items'}
                                </div>
                                <Link href={`/account/orders/${encodeURIComponent(order.id)}`} className="text-sm font-bold flex items-center gap-1 hover:underline">
                                    View Order <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
