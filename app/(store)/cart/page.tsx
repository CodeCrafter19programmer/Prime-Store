'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Cart() {
    const { items, updateQuantity, removeItem, subtotal } = useCart();

    return (
        <div className="pt-32 px-4 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold mb-12 uppercase tracking-tighter text-center">Your Cart</h1>

            {items.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500 mb-8">Your cart is empty.</p>
                    <Link href="/shop" className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 font-bold uppercase tracking-wider">Start Shopping</Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-8">
                        {items.map((item) => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
                                {/* Image */}
                                <div className="relative w-24 h-32 bg-gray-200 dark:bg-gray-800 rounded-sm flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold uppercase tracking-wide">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                                            </p>
                                        </div>
                                        <p className="font-medium">Shs {item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-gray-300 dark:border-gray-700">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                                            >-</button>
                                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-xs text-gray-400 hover:text-black dark:hover:text-white underline"
                                        >Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="w-full lg:w-96 bg-gray-50 dark:bg-gray-900 p-8 h-fit rounded-sm">
                        <h3 className="font-bold text-xl mb-6 uppercase tracking-wider">Order Summary</h3>
                        <div className="space-y-4 text-sm mb-8">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium">Shs {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium">Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700 text-lg font-bold">
                                <span>Total</span>
                                <span>Shs {subtotal.toLocaleString()}</span>
                            </div>
                        </div>
                        <Link href="/checkout" className="block w-full text-center bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                            Proceed to Checkout
                        </Link>
                        <p className="mt-4 text-xs text-center text-gray-400">Secure Checkout - Free Shipping on Orders over Shs 500,000</p>
                    </div>
                </div>
            )}
        </div>
    )
}
