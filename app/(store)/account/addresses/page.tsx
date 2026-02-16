'use client';

import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Addresses() {
    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Add New Button */}
            <button className="w-full border-2 border-dashed border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-lg hover:border-black dark:hover:border-white transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-black dark:hover:text-white group">
                <Plus size={28} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold uppercase tracking-wider text-sm">Add New Address</span>
            </button>

            {/* Default Address */}
            <div className="border border-gray-100 dark:border-gray-800 p-5 sm:p-6 rounded-lg bg-white dark:bg-gray-950 relative">
                <span className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase px-2 py-1 rounded-md">
                    Default
                </span>
                <h3 className="font-bold uppercase tracking-wide mb-3">John Doe</h3>
                <div className="text-gray-500 text-sm space-y-1 mb-5">
                    <p>123 Fashion Ave, Suite 400</p>
                    <p>New York, NY 10012</p>
                    <p>United States</p>
                    <p>+1 (555) 123-4567</p>
                </div>
                <div className="flex gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                    <button className="flex items-center gap-2 text-sm font-bold hover:underline underline-offset-4 py-1 px-1 min-h-[44px]">
                        <Edit2 size={14} /> Edit
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold text-red-500 hover:underline underline-offset-4 py-1 px-1 min-h-[44px]">
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            </div>

            {/* Other Address */}
            <div className="border border-gray-100 dark:border-gray-800 p-5 sm:p-6 rounded-lg bg-white dark:bg-gray-950">
                <h3 className="font-bold uppercase tracking-wide mb-3">John Doe (Office)</h3>
                <div className="text-gray-500 text-sm space-y-1 mb-5">
                    <p>456 Business Rd, Floor 2</p>
                    <p>San Francisco, CA 94107</p>
                    <p>United States</p>
                    <p>+1 (555) 987-6543</p>
                </div>
                <div className="flex flex-wrap gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                    <button className="flex items-center gap-2 text-sm font-bold hover:underline underline-offset-4 py-1 px-1 min-h-[44px]">
                        <Edit2 size={14} /> Edit
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold text-red-500 hover:underline underline-offset-4 py-1 px-1 min-h-[44px]">
                        <Trash2 size={14} /> Delete
                    </button>
                    <button className="text-sm text-gray-400 hover:text-black dark:hover:text-white transition-colors ml-auto py-1 px-1 min-h-[44px]">
                        Set as Default
                    </button>
                </div>
            </div>
        </div>
    );
}
