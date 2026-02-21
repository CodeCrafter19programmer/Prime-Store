'use client';

import { useData } from '@/context/DataContext';
import { Eye, Search } from 'lucide-react';

export default function AdminOrders() {
    const { orders, updateOrderStatus } = useData();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-black p-4 rounded-sm border border-gray-100 dark:border-gray-800">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-black text-xs uppercase text-gray-500 font-medium tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Total</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{order.customerName}</div>
                                        <div className="text-xs text-gray-500">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                            className={`text-xs px-2 py-1 rounded-full font-bold uppercase border-none focus:ring-0 cursor-pointer ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="PROCESSING">Processing</option>
                                            <option value="SHIPPED">Shipped</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">${order.totalAmount.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
