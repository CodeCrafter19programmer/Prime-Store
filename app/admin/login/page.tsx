'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock login
        setTimeout(() => {
            router.push('/admin/dashboard');
        }, 1000);
    };

    return (
        <div className="w-full max-w-md p-8 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 shadow-xl rounded-sm">
            <div className="mb-8 text-center">
                <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={20} />
                </div>
                <h1 className="text-2xl font-bold uppercase tracking-tight">Admin Access</h1>
                <p className="text-gray-500 text-sm mt-2">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                    <input type="email" required className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
                    <input type="password" required className="w-full bg-transparent border border-gray-300 dark:border-gray-700 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                </div>
                <button
                    disabled={loading}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Authenticating...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}
