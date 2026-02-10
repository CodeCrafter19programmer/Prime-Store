'use client';

import { Search, Filter, Eye, ChevronDown } from 'lucide-react';

export default function AdminOrders() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold uppercase tracking-tight">Orders</h1>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-sm border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by order ID, customer..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
                        <Filter size={16} /> Status
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
                        <Filter size={16} /> Date
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-black text-xs uppercase text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
                                <th className="px-6 py-4">Order</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4 text-right">Total</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-6 py-4 font-bold">#PRIME-882{i}</td>
                                    <td className="px-6 py-4 text-gray-500">Feb 6, 2026</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">John Doe</div>
                                        <div className="text-xs text-gray-500">john@example.com</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative">
                                            <select
                                                className={`text-xs px-2 py-1 rounded-full font-bold uppercase appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-black dark:focus:ring-white pr-6 ${i % 3 === 0 ? 'bg-orange-100 text-orange-800' :
                                                        i % 3 === 1 ? 'bg-blue-100 text-blue-800' :
                                                            'bg-green-100 text-green-800'
                                                    }`}
                                                defaultValue={i % 3 === 0 ? 'Pending' : i % 3 === 1 ? 'Shipped' : 'Delivered'}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Paid">Paid</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold uppercase">Paid</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">$125.00</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-black dark:hover:text-white">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-500">
                    <span>Showing 1-10 of 450 orders</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">Prev</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
