'use client';

import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Revenue', value: '$12,450', change: '+12%', icon: DollarSign },
        { label: 'Orders', value: '450', change: '+5%', icon: ShoppingBag },
        { label: 'Products', value: '86', change: '+2', icon: Package },
        { label: 'Growth', value: '18%', change: '+4%', icon: TrendingUp },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-gray-50 dark:bg-black rounded-lg">
                                <stat.icon size={20} className="text-gray-500" />
                            </div>
                            <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">{stat.change}</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Recent Orders</h3>
                    <button className="text-sm text-gray-500 hover:text-black dark:hover:text-white">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-black text-xs uppercase text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">#PRIME-88{i}</td>
                                    <td className="px-6 py-4">John Doe</td>
                                    <td className="px-6 py-4 text-gray-500">Feb 6, 2026</td>
                                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold uppercase">Paid</span></td>
                                    <td className="px-6 py-4 text-right font-medium">$85.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Best Selling Products */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="font-bold text-lg">Best Selling Products</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-sm flex-shrink-0" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">Classic White Tee</h4>
                                    <p className="text-xs text-gray-500">Men's Collection</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm">$45.00</p>
                                    <p className="text-xs text-green-500 font-bold">124 sales</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="font-bold text-lg text-red-500">Low Stock Alerts</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-sm">
                                <div>
                                    <h4 className="font-bold text-sm text-red-700 dark:text-red-400">Slim Fit Jeans</h4>
                                    <p className="text-xs text-red-600/70 dark:text-red-400/70">SKU: PRM-JEAN-00{i}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-red-600 dark:text-red-400">3</p>
                                    <p className="text-[10px] uppercase font-bold text-red-400">Left</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
