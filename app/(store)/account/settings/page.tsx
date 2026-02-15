'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import AccountSidebar from '@/components/AccountSidebar';
import { LogOut, Save, ShieldCheck, Mail, Lock, User, Phone, MapPin } from 'lucide-react';

export default function AccountSettings() {
    const router = useRouter();
    const { logout } = useAuth(); // Assuming useAuth has user data, but if not we'll mock.

    // Auth State
    const [step, setStep] = useState<'verify' | 'otp' | 'edit'>('verify');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form Data
    const [verificationData, setVerificationData] = useState({ email: '', password: '' });
    const [otpCode, setOtpCode] = useState('');
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+256 700 000000',
        address: 'Kampala, Uganda'
    });

    const handleVerifySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Mock verification
        setTimeout(() => {
            if (verificationData.email && verificationData.password) {
                // Determine if valid (mock: any non-empty)
                setStep('otp');
                // Simulate sending email
                alert('A verification code "123456" has been sent to your email.');
            } else {
                setError('Please fill in all fields.');
            }
            setIsLoading(false);
        }, 1500);
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            if (otpCode === '123456') {
                setStep('edit');
                // Pre-fill email from verification (or keep original profile email if they are just verifying identity)
                setProfileData(prev => ({ ...prev, email: verificationData.email }));
            } else {
                setError('Invalid code. Try "123456".');
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Save logic (mock)
        setTimeout(() => {
            alert('Settings saved successfully!');
            router.push('/account'); // Redirect to Account Overview
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">Account Settings</h1>
            <p className="text-gray-500 mb-12">Manage your personal information and security.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AccountSidebar />

                <div className="md:col-span-2">
                    <div className="border border-gray-100 dark:border-gray-800 p-8 rounded-sm max-w-2xl">

                        {/* Step 1: Verification */}
                        {step === 'verify' && (
                            <form onSubmit={handleVerifySubmit} className="space-y-6">
                                <div className="text-center mb-8">
                                    <ShieldCheck size={48} className="mx-auto mb-4 text-black dark:text-white" strokeWidth={1} />
                                    <h2 className="text-2xl font-bold uppercase">Verify Identity</h2>
                                    <p className="text-gray-500 text-sm mt-2">To make changes, please confirm your credentials.</p>
                                </div>

                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            required
                                            value={verificationData.email}
                                            onChange={(e) => setVerificationData({ ...verificationData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-black dark:focus:border-white transition-colors"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">Current Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            required
                                            value={verificationData.password}
                                            onChange={(e) => setVerificationData({ ...verificationData, password: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-black dark:focus:border-white transition-colors"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify & Continue'}
                                </button>
                            </form>
                        )}

                        {/* Step 2: OTP */}
                        {step === 'otp' && (
                            <form onSubmit={handleOtpSubmit} className="space-y-6">
                                <div className="text-center mb-8">
                                    <Mail size={48} className="mx-auto mb-4 text-black dark:text-white" strokeWidth={1} />
                                    <h2 className="text-2xl font-bold uppercase">Check your Email</h2>
                                    <p className="text-gray-500 text-sm mt-2">We sent a verification code to <strong>{verificationData.email}</strong></p>
                                </div>

                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">Verification Code</label>
                                    <input
                                        type="text"
                                        required
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value)}
                                        className="w-full px-4 py-3 text-center text-2xl tracking-[1em] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-black dark:focus:border-white transition-colors uppercase"
                                        placeholder="123456"
                                        maxLength={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Checking...' : 'Confirm Code'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep('verify')}
                                    className="w-full text-xs text-gray-500 underline uppercase tracking-wider hover:text-black dark:hover:text-white"
                                >
                                    Go Back
                                </button>
                            </form>
                        )}

                        {/* Step 3: Edit Profile */}
                        {step === 'edit' && (
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div className="text-center mb-8">
                                    <Image
                                        src="/logo.png"
                                        alt="Prime"
                                        width={100}
                                        height={50}
                                        className="mx-auto h-12 w-auto object-contain dark:invert mb-4"
                                    />
                                    <h2 className="text-2xl font-bold uppercase">Update Profile</h2>
                                    <p className="text-gray-500 text-sm mt-2">Update your personal details below.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                required
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-black dark:focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <input
                                                type="tel"
                                                required
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-black dark:focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <input
                                                type="email"
                                                required
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-black dark:focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2">Delivery Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <textarea
                                                required
                                                value={profileData.address}
                                                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-black dark:focus:border-white transition-colors h-24 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isLoading ? 'Saving...' : <><Save size={20} /> Save Changes</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
