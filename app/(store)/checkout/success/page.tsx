'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, UserPlus, Package } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Success() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const { isLoggedIn } = useAuth();

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-black/20">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
                >
                    <Check size={48} className="text-white" strokeWidth={3} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold uppercase tracking-tight mb-4"
                >
                    Thank You!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-gray-500 mb-8"
                >
                    Your order has been placed successfully. We've sent a confirmation email to {email || 'your inbox'}.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 p-6 rounded-sm mb-8 text-left"
                >
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                        <span className="text-sm font-bold uppercase text-gray-500">Order Number</span>
                        <span className="font-mono font-medium">#PRIME-8821</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Estimated Delivery</span>
                            <span className="font-medium">Feb 12 - Feb 14</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Payment Method</span>
                            <span className="font-medium">Credit Card (**** 4242)</span>
                        </div>
                    </div>
                </motion.div>

                {/* Account Creation Offer */}
                {!isLoggedIn && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 p-6 rounded-sm mb-8 text-left shadow-sm"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                                <UserPlus size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Create an Account</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Create an account to track your order, save your details, and checkout faster next time.
                                </p>
                                <Link
                                    href={`/register?email=${encodeURIComponent(email)}&flow=activate`}
                                    className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                >
                    <Link
                        href={isLoggedIn ? "/account/orders" : "/login"}
                        className="inline-flex items-center justify-center bg-transparent border border-black dark:border-white text-black dark:text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors w-full gap-2"
                    >
                        <Package size={18} /> {isLoggedIn ? 'Track Your Order' : 'Sign In to Track Order'}
                    </Link>

                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors w-full gap-2"
                    >
                        Continue Shopping <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
