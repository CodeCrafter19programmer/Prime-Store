'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Save, ShieldCheck, Mail, Lock, User, Phone, MapPin } from 'lucide-react';

export default function AccountSettings() {
    const router = useRouter();
    const { logout } = useAuth(); // Assuming useAuth has user data, but if not we'll mock.

    // Auth State
    const [step, setStep] = useState<'verify' | 'otp' | 'edit'>('verify');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form Data
    const [verificationData, setVerificationData] = useState({ email: '', password: '' });
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for 6 boxes
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+256 700 000000',
        address: 'Kampala, Uganda'
    });

    const handleOtpChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Focus previous input on backspace if current is empty
            const prev = (e.currentTarget.previousSibling as HTMLInputElement);
            if (prev) prev.focus();
        }
    };

    const handleVerifySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Mock verification
        setTimeout(() => {
            if (verificationData.email && verificationData.password) {
                // Determine if valid (mock: any non-empty)
                setStep('otp');
                // Simulate sending email (Silent in UI)
                console.log('Verification code sent: 123456');
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

        const code = otp.join('');

        setTimeout(() => {
            if (code === '123456') {
                setStep('edit');
                // Pre-fill email from verification (or keep original profile email if they are just verifying identity)
                setProfileData(prev => ({ ...prev, email: verificationData.email }));
            } else {
                setError('Invalid verification code. Please try again.');
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Save logic (mock)
        setTimeout(() => {
            router.push('/account'); // Redirect to Account Overview
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Account Settings</h2>
                <p className="text-gray-500 mb-8 max-w-2xl">Manage your personal information and security preferences.</p>
            </div>

            <div className="border border-gray-100 dark:border-gray-800 p-8 rounded-xl bg-white dark:bg-black/50 max-w-2xl">

                {/* Step 1: Verification */}
                {step === 'verify' && (
                    <form onSubmit={handleVerifySubmit} className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck size={32} className="text-black dark:text-white" strokeWidth={1.5} />
                            </div>
                            <h2 className="text-xl font-bold uppercase tracking-wide">Verify Identity</h2>
                            <p className="text-gray-500 text-sm mt-2">To make changes, please confirm your credentials.</p>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-md">{error}</p>}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={verificationData.email}
                                        onChange={(e) => setVerificationData({ ...verificationData, email: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-black dark:focus:border-white transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Current Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={verificationData.password}
                                        onChange={(e) => setVerificationData({ ...verificationData, password: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-black dark:focus:border-white transition-colors"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 mt-6"
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Continue'}
                        </button>
                    </form>
                )}

                {/* Step 2: OTP */}
                {step === 'otp' && (
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail size={32} className="text-black dark:text-white" strokeWidth={1.5} />
                            </div>
                            <h2 className="text-xl font-bold uppercase tracking-wide">Check your Email</h2>
                            <p className="text-gray-500 text-sm mt-2">We sent a verification code to <strong className="text-black dark:text-white">{verificationData.email}</strong></p>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-md">{error}</p>}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-4 text-center text-gray-500">Verification Code</label>
                            <div className="flex gap-2 justify-center">
                                {otp.map((data, index) => (
                                    <input
                                        className="w-12 h-14 border border-gray-400 dark:border-gray-600 text-center text-xl font-bold rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors bg-white dark:bg-gray-900 text-black dark:text-white"
                                        type="text"
                                        name="otp"
                                        maxLength={1}
                                        key={index}
                                        value={data}
                                        onChange={e => handleOtpChange(e.target, index)}
                                        onKeyDown={e => handleKeyDown(e, index)}
                                        onFocus={e => e.target.select()}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
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
                                className="mx-auto h-8 w-auto object-contain dark:invert mb-4"
                            />
                            <h2 className="text-xl font-bold uppercase tracking-wide">Update Profile</h2>
                            <p className="text-gray-500 text-sm mt-2">Update your personal details below.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-black dark:focus:border-white transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        required
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-black dark:focus:border-white transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-black dark:focus:border-white transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Delivery Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <textarea
                                        required
                                        value={profileData.address}
                                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-black dark:focus:border-white transition-colors h-24 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Saving...' : <><Save size={20} /> Save Changes</>}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
