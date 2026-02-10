'use client';

import Link from 'next/link';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash } from 'lucide-react';

export default function ProductsList() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold uppercase tracking-tight">Products</h1>
                <Link href="/admin/products/new" className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity flex items-center gap-2">
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-900 p-4 rounded-sm border border-gray-100 dark:border-gray-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* Categories / Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-black text-xs uppercase text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 w-12">
                                    <input type="checkbox" className="rounded" />
                                </th>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Inventory</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4 text-right">Price</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded" />
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-200 rounded-sm flex-shrink-0"></div>
                                        <span className="font-medium">Classic White Tee</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold uppercase">Active</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        124 in stock
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 capitalize">Men</td>
                                    <td className="px-6 py-4 text-right font-medium">$45.00</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-black dark:hover:text-white">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-500">
                    <span>Showing 1-10 of 86 products</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">Prev</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
