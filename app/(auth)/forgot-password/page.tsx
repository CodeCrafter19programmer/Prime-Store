'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ForgotPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordContent />
        </Suspense>
    )
}

function ForgotPasswordContent() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    const handleResend = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        alert("Email resent successfully!");
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-black/20">
            <div className="w-full max-w-md bg-white dark:bg-black p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-white/5 rounded-sm">

                {/* Branding */}
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/logo.png"
                        alt="Prime Store"
                        width={360}
                        height={180}
                        className="object-contain h-36 w-auto dark:invert mb-4"
                    />
                    <h2 className="text-xl font-bold uppercase tracking-widest">Prime Store</h2>
                </div>

                {!submitted ? (
                    <>
                        <h1 className="text-2xl font-bold uppercase tracking-tight mb-2 text-center">Forgot Your Password?</h1>
                        <p className="text-gray-500 text-center text-sm mb-10">
                            Enter your email address and we will send you instructions to reset your password.
                        </p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-70"
                            >
                                {loading ? 'Sending...' : 'Continue'}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <Link href="/login" className="font-bold text-black dark:text-white hover:underline flex items-center justify-center gap-2">
                                Back to Login
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500 text-green-500">
                            <Mail size={32} />
                        </div>

                        <h1 className="text-2xl font-bold uppercase tracking-tight mb-4">Check Your Email</h1>

                        <p className="text-gray-500 text-sm mb-2">
                            Please check the email address
                        </p>
                        <p className="font-bold text-black dark:text-white mb-6 break-all">
                            {email}
                        </p>
                        <p className="text-gray-500 text-sm mb-10">
                            for instructions to reset your password.
                        </p>

                        <div className="space-y-4">
                            {/* Link to simulate email click for demo purposes - usually hidden in real app but helpful for dev */}
                            <Link
                                href="/reset-password?token=demo-token"
                                className="hidden text-xs text-blue-500 hover:underline mb-4 block"
                            >
                                (Dev Only: Click here to simulate email link)
                            </Link>

                            <button
                                onClick={handleResend}
                                disabled={loading}
                                className="w-full bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-gray-700 py-4 font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                {loading ? 'Resending...' : 'Resend Email'}
                            </button>

                            <Link
                                href="/"
                                className="block w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
                            >
                                Back to Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
