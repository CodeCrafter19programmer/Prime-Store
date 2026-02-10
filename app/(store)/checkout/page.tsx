'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, CreditCard, Truck, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Checkout() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock handle submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            router.push(`/checkout/success?email=${encodeURIComponent(email)}`);
        }, 2000);
    };

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50 dark:bg-black/20">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/cart" className="hover:text-black dark:hover:text-white transition-colors">Cart</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="font-medium text-black dark:text-white">Checkout</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Column: Forms */}
                    <div className="flex-1 space-y-8">
                        <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">Checkout</h1>

                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                            {/* Shipping Address */}
                            <section className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 p-6 md:p-8 rounded-sm">
                                <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center">
                                    <span className="w-6 h-6 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xs mr-3">1</span>
                                    Shipping Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-full">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">First Name</label>
                                        <input required type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Last Name</label>
                                        <input required type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Address</label>
                                        <input required type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">City</label>
                                        <input required type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Postal Code</label>
                                        <input required type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone</label>
                                        <input required type="tel" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                    </div>
                                </div>
                            </section>

                            {/* Delivery Method */}
                            <section className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 p-6 md:p-8 rounded-sm">
                                <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center">
                                    <span className="w-6 h-6 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xs mr-3">2</span>
                                    Delivery Method
                                </h2>
                                <div className="space-y-4">
                                    <label className="flex items-center justify-between border border-black dark:border-white p-4 cursor-pointer">
                                        <div className="flex items-center">
                                            <input type="radio" name="delivery" defaultChecked className="accent-black dark:accent-white mr-4 w-4 h-4" />
                                            <div>
                                                <p className="font-bold text-sm uppercase">Standard Delivery</p>
                                                <p className="text-xs text-gray-500 mt-1">3-5 Business Days</p>
                                            </div>
                                        </div>
                                        <span className="font-medium text-sm">Free</span>
                                    </label>
                                    <label className="flex items-center justify-between border border-gray-200 dark:border-gray-800 p-4 cursor-pointer hover:border-gray-400 transition-colors">
                                        <div className="flex items-center">
                                            <input type="radio" name="delivery" className="accent-black dark:accent-white mr-4 w-4 h-4" />
                                            <div>
                                                <p className="font-bold text-sm uppercase">Express Shipping</p>
                                                <p className="text-xs text-gray-500 mt-1">1-2 Business Days</p>
                                            </div>
                                        </div>
                                        <span className="font-medium text-sm">$15.00</span>
                                    </label>
                                </div>
                            </section>

                            {/* Payment */}
                            <section className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 p-6 md:p-8 rounded-sm">
                                <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center">
                                    <span className="w-6 h-6 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xs mr-3">3</span>
                                    Payment
                                </h2>

                                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <ShieldCheck size={20} className="mr-3 text-green-600" />
                                    All transactions are secure and encrypted.
                                </div>

                                <div className="space-y-4">
                                    <div className="border border-black dark:border-white p-4">
                                        <div className="flex items-center mb-4">
                                            <input type="radio" name="payment" defaultChecked className="accent-black dark:accent-white mr-4 w-4 h-4" />
                                            <span className="font-bold text-sm uppercase flex items-center gap-2">
                                                Credit Card
                                                <span className="flex gap-1 ml-2 text-gray-400">
                                                    <CreditCard size={16} />
                                                </span>
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 pl-8">
                                            <input placeholder="Card Number" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input placeholder="MM / YY" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                                <input placeholder="CVC" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                            </div>
                                            <input placeholder="Name on Card" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                        </div>
                                    </div>

                                    <label className="flex items-center border border-gray-200 dark:border-gray-800 p-4 cursor-pointer hover:border-gray-400 transition-colors">
                                        <input type="radio" name="payment" className="accent-black dark:accent-white mr-4 w-4 h-4" />
                                        <span className="font-bold text-sm uppercase">PayPal</span>
                                    </label>
                                    <label className="flex items-center border border-gray-200 dark:border-gray-800 p-4 cursor-pointer hover:border-gray-400 transition-colors">
                                        <input type="radio" name="payment" className="accent-black dark:accent-white mr-4 w-4 h-4" />
                                        <span className="font-bold text-sm uppercase">Mobile Money / M-Pesa</span>
                                    </label>
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="flex-1 lg:max-w-md">
                        <div className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 p-6 md:p-8 sticky top-32 rounded-sm shadow-sm md:shadow-none">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Order Summary</h2>

                            {/* Items List (Collapsed version) */}
                            <div className="space-y-4 mb-8">
                                <div className="flex gap-4">
                                    <div className="relative w-16 h-20 bg-gray-200 dark:bg-gray-800 rounded-sm overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop"
                                            alt="Item"
                                            fill
                                            className="object-cover"
                                        />
                                        <span className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full -mr-2 -mt-2">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Classic White Tee</p>
                                        <p className="text-xs text-gray-500">M / White</p>
                                    </div>
                                    <p className="text-sm font-medium">$45.00</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="relative w-16 h-20 bg-gray-200 dark:bg-gray-800 rounded-sm overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=1887&auto=format&fit=crop"
                                            alt="Item"
                                            fill
                                            className="object-cover"
                                        />
                                        <span className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full -mr-2 -mt-2">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Oversized Denim Jacket</p>
                                        <p className="text-xs text-gray-500">L / Blue</p>
                                    </div>
                                    <p className="text-sm font-medium">$120.00</p>
                                </div>
                            </div>

                            <div className="border-t border-b border-gray-100 dark:border-gray-800 py-6 mb-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-medium">$165.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold mb-8">
                                <span>Total</span>
                                <span>$165.00</span>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isProcessing ? 'Processing...' : 'Place Order'}
                            </button>
                            <p className="text-[10px] text-gray-400 text-center mt-4">By placing your order, you agree to our Terms & Conditions and return policies.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
