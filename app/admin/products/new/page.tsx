'use client';

import Link from 'next/link';
import { ArrowLeft, Upload, Save } from 'lucide-react';

export default function NewProduct() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold uppercase tracking-tight">Add New Product</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-sm border border-gray-100 dark:border-gray-800 space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Product Name</label>
                            <input type="text" className="w-full p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors" placeholder="e.g. Classic White Tee" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Description</label>
                            <textarea rows={5} className="w-full p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors" placeholder="Product details..."></textarea>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-sm border border-gray-100 dark:border-gray-800 space-y-6">
                        <h3 className="font-bold text-lg">Media</h3>
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-sm p-12 flex flex-col items-center justify-center text-gray-500 hover:border-black dark:hover:border-white transition-colors cursor-pointer bg-gray-50 dark:bg-black/50">
                            <Upload size={32} className="mb-4" />
                            <p className="font-medium">Click to upload images</p>
                            <p className="text-xs mt-2">or drag and drop</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-sm border border-gray-100 dark:border-gray-800 space-y-6">
                        <h3 className="font-bold text-lg">Pricing</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wide mb-2">Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input type="number" className="w-full pl-8 pr-3 py-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors" placeholder="0.00" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wide mb-2">Compare at Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input type="number" className="w-full pl-8 pr-3 py-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors" placeholder="0.00" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-sm border border-gray-100 dark:border-gray-800 space-y-6">
                        <h3 className="font-bold text-lg">Status</h3>
                        <select className="w-full p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors">
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Archived</option>
                        </select>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-sm border border-gray-100 dark:border-gray-800 space-y-6">
                        <h3 className="font-bold text-lg">Organization</h3>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Category</label>
                            <select className="w-full p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors">
                                <option>Men</option>
                                <option>Women</option>
                                <option>Accessories</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Tags</label>
                            <input type="text" className="w-full p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-sm outline-none focus:border-black dark:focus:border-white transition-colors" placeholder="e.g. Summer, Sale" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-8 border-t border-gray-200 dark:border-gray-800">
                <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 font-bold uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-2">
                    <Save size={18} /> Save Product
                </button>
            </div>
        </div>
    )
}
