'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function Register() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterContent />
        </Suspense>
    )
}

function RegisterContent() {
    const searchParams = useSearchParams();
    const flow = searchParams.get('flow');
    const emailParam = searchParams.get('email') || '';
    const isActivate = flow === 'activate';
    const router = useRouter();
    const { login, isLoggedIn } = useAuth();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            router.push(callbackUrl);
        }
    }, [isLoggedIn, router, callbackUrl]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login();
        router.push(callbackUrl);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-black/20 relative">
            <Link
                href="/"
                className="absolute top-8 left-6 sm:left-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black dark:hover:text-white transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Return to Shopping
            </Link>
            <div className="w-full max-w-md bg-white dark:bg-black p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-white/5 rounded-sm">
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

                <h1 className="text-3xl font-bold uppercase tracking-tight mb-2 text-center">
                    {isActivate ? 'Activate Account' : 'Create Account'}
                </h1>
                <p className="text-gray-500 text-center text-sm mb-10">
                    {isActivate ? 'Set a password to manage your orders.' : 'Join Prime Store for exclusive access and faster checkout.'}
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {!isActivate && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">First Name</label>
                                <input type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                        <input
                            type="email"
                            defaultValue={emailParam}
                            readOnly={isActivate}
                            className={`w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors ${isActivate ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : ''}`}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
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

                    {isActivate && (
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {!isActivate && (
                        <div className="flex items-start gap-3">
                            <input type="checkbox" className="mt-1 accent-black dark:accent-white" />
                            <p className="text-xs text-gray-500 leading-relaxed">By creating an account, I agree to the <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
                        </div>
                    )}

                    <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        {isActivate ? 'Activate My Account' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    {isActivate ? (
                        <p className="text-gray-500"><Link href="/login" className="font-bold text-black dark:text-white hover:underline">Back to Login</Link></p>
                    ) : (
                        <p className="text-gray-500">Already have an account? <Link href="/login" className="font-bold text-black dark:text-white hover:underline">Sign In</Link></p>
                    )}
                </div>
            </div>
        </div>
    )
}
