'use client';

import Link from 'next/link';
import { Package, User, MapPin, Heart, LogOut, ArrowLeft, CheckCircle, Truck, RefreshCcw } from 'lucide-react';
import { use, useState } from 'react';

export default function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    // In a real app, fetch order details by id here.

    // Mock logic for status
    const isDelivered = id.includes('8821') || id.includes('8620');

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="mb-8">
                <Link href="/account/orders" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-4">
                    <ArrowLeft size={16} /> Back to Orders
                </Link>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-3xl font-bold uppercase tracking-tight">Order {decodeURIComponent(id)}</h1>
                    <span className={`px-3 py-1 text-sm font-bold uppercase rounded-sm ${isDelivered ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Placed on Feb 6, 2026</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Order Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Items */}
                    <div className="space-y-6">
                        <h2 className="font-bold uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 pb-2">Items</h2>
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-20 h-24 bg-gray-200 dark:bg-gray-800 rounded-sm flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-sm uppercase">Classic White Tee</h3>
                                            <p className="text-xs text-gray-500 mt-1">Size: M | Color: White</p>
                                        </div>
                                        <p className="font-bold text-sm">$45.00</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Qty: 1</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tracking / Timeline */}
                    <div className="space-y-6 border-t border-gray-100 dark:border-gray-800 pt-8">
                        <h2 className="font-bold uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 pb-2 mb-4">Tracking</h2>

                        <div className="space-y-8 pl-2 border-l-2 border-gray-100 dark:border-gray-800 ml-2">
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-black"></div>
                                <h4 className="font-bold text-sm">Delivered</h4>
                                <p className="text-xs text-gray-500">Feb 8, 2026 - 10:30 AM</p>
                                <p className="text-sm mt-1">Package delivered to front desk.</p>
                            </div>
                            <div className="relative pl-8 opacity-50">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-black"></div>
                                <h4 className="font-bold text-sm">Out for Delivery</h4>
                                <p className="text-xs text-gray-500">Feb 8, 2026 - 08:00 AM</p>
                            </div>
                            <div className="relative pl-8 opacity-50">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-black"></div>
                                <h4 className="font-bold text-sm">Shipped</h4>
                                <p className="text-xs text-gray-500">Feb 7, 2026 - 04:00 PM</p>
                            </div>
                            <div className="relative pl-8 opacity-50">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-black"></div>
                                <h4 className="font-bold text-sm">Order Confirmed</h4>
                                <p className="text-xs text-gray-500">Feb 6, 2026 - 02:15 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-8">
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-sm">
                        <h3 className="font-bold uppercase tracking-wide mb-4 text-sm">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span>$90.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span>$10.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tax</span>
                                <span>$8.50</span>
                            </div>
                            <div className="flex justify-between font-bold border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                                <span>Total</span>
                                <span>$108.50</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold uppercase tracking-wide mb-2 text-sm">Shipping Address</h3>
                            <div className="text-sm text-gray-500">
                                <p>John Doe</p>
                                <p>123 Fashion Ave</p>
                                <p>New York, NY 10012</p>
                                <p>United States</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold uppercase tracking-wide mb-2 text-sm">Payment Method</h3>
                            <div className="text-sm text-gray-500">
                                <p>Visa ending in 4242</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full border border-gray-200 dark:border-gray-800 py-3 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                        Request Return / Refund
                    </button>
                </div>
            </div>
        </div>
    )
}
