'use client';

import { Search, Filter, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function Inventory() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold uppercase tracking-tight">Inventory</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-900 p-4 rounded-sm border border-gray-100 dark:border-gray-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by product, SKU..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-black text-xs uppercase text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">SKU</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Stock Level</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {[1, 2, 3, 4, 5, 6].map((i) => {
                                const stock = i % 3 === 0 ? 0 : i % 3 === 1 ? 5 : 124;
                                const status = stock === 0 ? 'Out of Stock' : stock < 10 ? 'Low Stock' : 'In Stock';
                                const statusColor = stock === 0 ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : stock < 10 ? 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' : 'text-green-600 bg-green-50 dark:bg-green-900/20';

                                return (
                                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                                        <td className="px-6 py-4 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-200 rounded-sm flex-shrink-0" />
                                            <span className="font-medium">Classic T-Shirt {i}</span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">PRM-TEE-00{i}</td>
                                        <td className="px-6 py-4 text-gray-500">Men</td>
                                        <td className="px-6 py-4 font-bold">{stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-2 w-fit px-2 py-1 rounded-full text-xs font-bold uppercase ${statusColor}`}>
                                                {stock === 0 ? <XCircle size={12} /> : stock < 10 ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:underline font-medium text-xs uppercase">Adjust</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

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
