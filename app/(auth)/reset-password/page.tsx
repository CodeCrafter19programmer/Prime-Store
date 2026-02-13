'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function ResetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    )
}

function ResetPasswordContent() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSuccess(true);

        // Redirect after a short delay or show success message then login button
    };

    if (success) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-black/20">
                <div className="w-full max-w-md bg-white dark:bg-black p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-white/5 rounded-sm text-center">
                    <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500 text-green-500">
                        <CheckCircle size={32} />
                    </div>
                    <h1 className="text-2xl font-bold uppercase tracking-tight mb-4">Password Reset Successful</h1>
                    <p className="text-gray-500 text-sm mb-8">
                        Your password has been updated. You can now log in with your new password.
                    </p>
                    <Link
                        href="/login"
                        className="block w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-black/20">
            <div className="w-full max-w-md bg-white dark:bg-black p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-white/5 rounded-sm">

                {/* Branding */}
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/logo.png"
                        alt="Prime Store"
                        width={120}
                        height={60}
                        className="object-contain h-12 w-auto dark:invert mb-4"
                    />
                    <h2 className="text-xl font-bold uppercase tracking-widest">Prime Store</h2>
                </div>

                <h1 className="text-2xl font-bold uppercase tracking-tight mb-2 text-center">Create New Password</h1>
                <p className="text-gray-500 text-center text-sm mb-10">
                    Your new password must be different from previous used passwords.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                    <button
                        disabled={loading}
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Reseting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}
