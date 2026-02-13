'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Info, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    )
}

function LoginContent() {
    const router = useRouter(); // Added router
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const alertParam = searchParams.get('alert');
    const [email, setEmail] = useState('');
    const [showOrderFound, setShowOrderFound] = useState(alertParam === 'order_found');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Logic: Check if email is associated with a guest order
        if (email.includes('guest')) {
            setShowOrderFound(true);
        } else {
            console.log('Logging in...');
            login(); // Set session
            router.push('/'); // Redirect to store home
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-black/20">
            <div className="w-full max-w-md bg-white dark:bg-black p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-white/5 rounded-sm">
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/logo.png"
                        alt="Prime Store"
                        width={360}
                        height={180}
                        className="object-contain h-36 w-auto dark:invert mb-4"
                    />
                    {/* Store Name is usually in the logo, but user "and store name". If logo has text, adding text again implies duplication. 
                        However, request says "using the logo and store name add them".
                        I'll add the Store Name text below logo just in case, or assume logo has it. 
                        The logo alt is "Prime Store". I will add a text element. */}
                    <h2 className="text-xl font-bold uppercase tracking-widest">Prime Store</h2>
                </div>

                <h1 className="text-3xl font-bold uppercase tracking-tight mb-2 text-center">Welcome Back</h1>
                <p className="text-gray-500 text-center text-sm mb-10">Sign in to access your orders and wishlist.</p>

                {showOrderFound && (
                    <div className="mb-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-600 dark:text-gray-300 flex gap-3">
                        <Info className="flex-shrink-0" size={20} />
                        <div>
                            <p className="font-bold mb-1">Account Found</p>
                            <p>We found an order with this email. <Link href={`/register?email=${encodeURIComponent(email)}&flow=activate`} className="underline font-bold hover:text-black dark:hover:text-white">Set a password</Link> to manage your orders.</p>
                        </div>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
                            <Link href="/forgot-password" className="text-xs text-gray-400 hover:text-black dark:hover:text-white underline">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <p className="text-gray-500">Don't have an account? <Link href="/register" className="font-bold text-black dark:text-white hover:underline">Create one</Link></p>
                </div>
            </div>
        </div>
    )
}
