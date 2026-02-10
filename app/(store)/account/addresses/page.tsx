'use client';

import Link from 'next/link';
import AccountSidebar from '@/components/AccountSidebar';
import { Package, User, MapPin, Heart, LogOut, Plus, Edit2, Trash2 } from 'lucide-react';

export default function Addresses() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">Addresses</h1>
            <p className="text-gray-500 mb-12">Manage your shipping and billing addresses.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar / Menu */}
                {/* Sidebar / Menu */}
                <AccountSidebar />

                {/* Main Content: Addresses */}
                <div className="md:col-span-2 space-y-6">

                    {/* Add New Button */}
                    <button className="w-full border-2 border-dashed border-gray-200 dark:border-gray-800 p-8 rounded-sm hover:border-black dark:hover:border-white transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-black dark:hover:text-white group">
                        <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-bold uppercase tracking-wider text-sm">Add New Address</span>
                    </button>

                    {/* Default Address */}
                    <div className="border border-gray-100 dark:border-gray-800 p-6 rounded-sm relative">
                        <span className="absolute top-6 right-6 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase px-2 py-1">Default</span>
                        <h3 className="font-bold uppercase tracking-wide mb-4">John Doe</h3>
                        <div className="text-gray-500 text-sm space-y-1 mb-6">
                            <p>123 Fashion Ave, Suite 400</p>
                            <p>New York, NY 10012</p>
                            <p>United States</p>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="flex gap-4 border-t border-gray-50 dark:border-gray-900 pt-4">
                            <button className="flex items-center gap-2 text-sm font-bold hover:underline">
                                <Edit2 size={14} /> Edit
                            </button>
                            <button className="flex items-center gap-2 text-sm font-bold text-red-500 hover:underline">
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>

                    {/* Other Address */}
                    <div className="border border-gray-100 dark:border-gray-800 p-6 rounded-sm">
                        <h3 className="font-bold uppercase tracking-wide mb-4">John Doe (Office)</h3>
                        <div className="text-gray-500 text-sm space-y-1 mb-6">
                            <p>456 Business Rd, Floor 2</p>
                            <p>San Francisco, CA 94107</p>
                            <p>United States</p>
                            <p>+1 (555) 987-6543</p>
                        </div>
                        <div className="flex gap-4 border-t border-gray-50 dark:border-gray-900 pt-4">
                            <button className="flex items-center gap-2 text-sm font-bold hover:underline">
                                <Edit2 size={14} /> Edit
                            </button>
                            <button className="flex items-center gap-2 text-sm font-bold text-red-500 hover:underline">
                                <Trash2 size={14} /> Delete
                            </button>
                            <button className="text-sm text-gray-400 hover:text-black dark:hover:text-white transition-colors ml-auto">
                                Set as Default
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
