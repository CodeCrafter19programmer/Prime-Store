'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Save, ShieldCheck, Mail, Lock, User, Phone, MapPin } from 'lucide-react';

export default function AccountSettings() {
    const router = useRouter();

    // Auth State
    const [step, setStep] = useState<'verify' | 'otp' | 'edit'>('verify');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form Data
    const [verificationData, setVerificationData] = useState({ email: '', password: '' });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
            const prev = (e.currentTarget.previousSibling as HTMLInputElement);
            if (prev) prev.focus();
        }
    };

    const handleVerifySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            if (verificationData.email && verificationData.password) {
                setStep('otp');
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

        setTimeout(() => {
            router.push('/account');
            setIsLoading(false);
        }, 1500);
    };

    const inputBaseClass = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-black dark:focus:border-white transition-colors rounded-lg text-sm";

    return (
        <div className="max-w-2xl">
            <div className="border border-gray-100 dark:border-gray-800 p-6 sm:p-8 rounded-lg bg-white dark:bg-gray-950">

                {/* Step 1: Verification */}
                {step === 'verify' && (
                    <form onSubmit={handleVerifySubmit} className="space-y-6">
                        <div className="text-center mb-6 sm:mb-8">
                            <ShieldCheck size={44} className="mx-auto mb-4 text-black dark:text-white" strokeWidth={1} />
                            <h2 className="text-xl sm:text-2xl font-bold uppercase">Verify Identity</h2>
                            <p className="text-gray-500 text-sm mt-2">To make changes, please confirm your credentials.</p>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-950/30 py-2 rounded-lg" role="alert">
                                {error}
                            </p>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={verificationData.email}
                                    onChange={(e) => setVerificationData({ ...verificationData, email: e.target.value })}
                                    className={inputBaseClass}
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
                                    className={inputBaseClass}
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 sm:py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 rounded-lg text-sm"
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Continue'}
                        </button>
                    </form>
                )}

                {/* Step 2: OTP */}
                {step === 'otp' && (
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                        <div className="text-center mb-6 sm:mb-8">
                            <Mail size={44} className="mx-auto mb-4 text-black dark:text-white" strokeWidth={1} />
                            <h2 className="text-xl sm:text-2xl font-bold uppercase">Check your Email</h2>
                            <p className="text-gray-500 text-sm mt-2">We sent a verification code to <strong>{verificationData.email}</strong></p>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-950/30 py-2 rounded-lg" role="alert">
                                {error}
                            </p>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-4 text-center">Verification Code</label>
                            <div className="flex gap-2 sm:gap-3 justify-center">
                                {otp.map((data, index) => (
                                    <input
                                        className="w-10 h-12 sm:w-12 sm:h-14 border border-gray-400 dark:border-gray-600 text-center text-lg sm:text-xl font-bold rounded-lg focus:border-black dark:focus:border-white outline-none transition-colors bg-white dark:bg-gray-900 text-black dark:text-white"
                                        type="text"
                                        name="otp"
                                        maxLength={1}
                                        key={index}
                                        value={data}
                                        onChange={e => handleOtpChange(e.target, index)}
                                        onKeyDown={e => handleKeyDown(e, index)}
                                        onFocus={e => e.target.select()}
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 sm:py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 rounded-lg text-sm"
                        >
                            {isLoading ? 'Checking...' : 'Confirm Code'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep('verify')}
                            className="w-full text-xs text-gray-500 underline uppercase tracking-wider hover:text-black dark:hover:text-white py-2 min-h-[44px]"
                        >
                            Go Back
                        </button>
                    </form>
                )}

                {/* Step 3: Edit Profile */}
                {step === 'edit' && (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="text-center mb-6 sm:mb-8">
                            <Image
                                src="/logo.png"
                                alt="Prime"
                                width={100}
                                height={50}
                                className="mx-auto h-10 sm:h-12 w-auto object-contain dark:invert mb-4"
                            />
                            <h2 className="text-xl sm:text-2xl font-bold uppercase">Update Profile</h2>
                            <p className="text-gray-500 text-sm mt-2">Update your personal details below.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className={inputBaseClass}
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
                                        className={inputBaseClass}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className={inputBaseClass}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">Delivery Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <textarea
                                        required
                                        value={profileData.address}
                                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                        className={`${inputBaseClass} h-24 resize-none`}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 sm:py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 rounded-lg text-sm"
                        >
                            {isLoading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
