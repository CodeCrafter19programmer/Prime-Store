'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { adminLogin } from '../actions';

export default function AdminLogin() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg('');
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await adminLogin(formData);
            if (result.success) {
                router.push('/admin/dashboard');
            } else {
                setErrorMsg(result.error || 'Authentication failed');
            }
        });
    };

    return (
        <div className="w-full max-w-md p-8 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 shadow-xl rounded-sm">
            <div className="flex flex-col items-center mb-8">
                <Image
                    src="/logo.png"
                    alt="Prime Store"
                    width={360}
                    height={180}
                    className="object-contain h-36 w-auto dark:invert mb-4"
                />
                <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Prime Store</h2>
                <h1 className="text-2xl font-bold uppercase tracking-tight">Admin Access</h1>
                <p className="text-gray-500 text-sm mt-2">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                {errorMsg && (
                    <div className="bg-red-50 text-red-500 border border-red-200 text-sm font-bold p-3 rounded-sm text-center uppercase">
                        {errorMsg}
                    </div>
                )}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                    <input name="email" type="email" required className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
                    <div className="relative">
                        <input
                            name="password"
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
                <button
                    disabled={isPending}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                    {isPending ? 'Authenticating...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}
