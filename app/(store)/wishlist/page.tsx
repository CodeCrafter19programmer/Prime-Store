'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package, User, MapPin, Heart, LogOut, ShoppingBag, X } from 'lucide-react';

export default function Wishlist() {
    const wishlistItems = [
        {
            id: '1',
            name: 'Silk Blouse',
            price: 95.00,
            image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=1896&auto=format&fit=crop'
        },
        {
            id: '3',
            name: 'Pleated Trousers',
            price: 85.00,
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1887&auto=format&fit=crop'
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">My Wishlist</h1>
            <p className="text-gray-500 mb-12">Save your favorite items for later.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar / Menu */}
                <div className="space-y-2">
                    <Link href="/account" className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-gray-500 hover:text-black dark:hover:text-white">
                        <User size={20} /> Overview
                    </Link>
                    <Link href="/account/orders" className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-gray-500 hover:text-black dark:hover:text-white">
                        <Package size={20} /> Orders
                    </Link>
                    <Link href="/account/addresses" className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-gray-500 hover:text-black dark:hover:text-white">
                        <MapPin size={20} /> Addresses
                    </Link>
                    <Link href="/wishlist" className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 border-l-4 border-black dark:border-white font-medium">
                        <Heart size={20} /> Wishlist
                    </Link>
                    <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-red-500 text-left">
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>

                {/* Main Content: Wishlist Grid */}
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="group relative border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                                <button className="absolute top-2 right-2 z-10 bg-white dark:bg-black p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                                    <X size={16} />
                                </button>

                                <div className="relative aspect-[3/4] bg-gray-200 dark:bg-gray-800">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <button className="w-full bg-white/90 dark:bg-black/90 backdrop-blur text-black dark:text-white py-3 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 хоver:bg-white dark:hover:bg-black">
                                            <ShoppingBag size={16} /> Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold uppercase tracking-wide text-sm">{item.name}</h3>
                                    <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
