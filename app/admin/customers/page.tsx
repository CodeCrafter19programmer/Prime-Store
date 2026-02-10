'use client';

import { Search, Filter, MoreHorizontal, Mail } from 'lucide-react';

export default function Customers() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold uppercase tracking-tight">Customers</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-900 p-4 rounded-sm border border-gray-100 dark:border-gray-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* Customers Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-black text-xs uppercase text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4 text-center">Orders</th>
                                <th className="px-6 py-4 text-right">Total Spent</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-black dark:text-white">
                                            {i % 2 === 0 ? 'Jane Smith' : 'Guest User'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {i % 2 === 0 ? 'jane@example.com' : `guest_${i}@example.com`}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold uppercase">Active</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 rounded-sm font-bold uppercase ${i % 2 === 0 ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {i % 2 === 0 ? 'Registered' : 'Guest'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium">
                                        {i * 2 + 1}
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">
                                        ${(i * 120.50).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" title="Email Customer">
                                                <Mail size={16} className="text-gray-500" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                                <MoreHorizontal size={16} className="text-gray-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-500">
                    <span>Showing 1-10 of 124 customers</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">Prev</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
