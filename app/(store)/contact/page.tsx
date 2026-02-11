'use client';

import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Info */}
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-8">Get In Touch</h1>
                        <p className="text-gray-500 text-lg mb-12 max-w-md">We'd love to hear from you. Whether you have a question about shipping, returns, or just want to say hello.</p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center rounded-full shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider mb-1">Email</h3>
                                    <p className="text-gray-500">ntalestephen19@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center rounded-full shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider mb-1">Phone</h3>
                                    <p className="text-gray-500">+256778087986</p>
                                    <p className="text-xs text-gray-400 mt-1">24/7 EAT</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-gray-50 dark:bg-black/20 p-8 md:p-12 rounded-sm">
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-3 outline-none focus:border-black dark:focus:border-white transition-colors" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Subject</label>
                                <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-3 outline-none focus:border-black dark:focus:border-white transition-colors">
                                    <option>Order Inquiry</option>
                                    <option>Returns & Exchanges</option>
                                    <option>Product Question</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Message</label>
                                <textarea rows={5} className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-3 outline-none focus:border-black dark:focus:border-white transition-colors"></textarea>
                            </div>

                            <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
