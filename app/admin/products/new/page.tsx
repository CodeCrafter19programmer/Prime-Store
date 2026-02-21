'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewProduct() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '0',
        category: 'clothing',
        description: '',
        imageUrl: '' // Changed from image
    });

    const categories = ['clothing', 'accessories', 'footwear', 'jewelry', 'electronics'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Upload file if it exists
            let finalImageUrl = formData.imageUrl;

            if (imageFile) {
                const fileData = new FormData();
                fileData.append('file', imageFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: fileData
                });

                if (!uploadRes.ok) throw new Error('Failed to upload image file');
                const uploadJson = await uploadRes.json();
                finalImageUrl = uploadJson.url;
            }

            // 2. Transact product creation
            const payload = {
                ...formData,
                imageUrl: finalImageUrl
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to create product');

            // Redirect to products list instantly after successful insert
            router.push('/admin/products');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to save to database.');
            setIsSubmitting(false); // Reset so they can try again
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                <Link href="/admin/products" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                    <ChevronLeft size={16} /> Back to Products
                </Link>
                <span className="text-gray-300">/</span>
                <span className="font-medium text-black dark:text-white">New Product</span>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-8">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Product Name</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-3 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                placeholder="e.g. Classic White Tee"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-3 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors appearance-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="capitalize">{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Price ($)</label>
                            <input
                                required
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                step="0.01"
                                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-3 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Initial Stock</label>
                            <input
                                required
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                type="number"
                                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-3 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                placeholder="e.g. 50"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Product Image</label>

                            <div className="flex flex-col gap-4">
                                {/* Native Upload */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-2 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black dark:file:bg-white dark:file:text-black hover:file:bg-gray-300"
                                />

                                <div className="flex items-center gap-4">
                                    <span className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></span>
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">OR PASTE URL</span>
                                    <span className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></span>
                                </div>

                                {/* External Default URL fallback */}
                                <input
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    type="url"
                                    className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-3 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Product Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-3 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors h-32 resize-none"
                            placeholder="A timeless luxury piece..."
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                        <Link
                            href="/admin/products"
                            className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity rounded-sm disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="animate-spin" size={16} /> Saving...</>
                            ) : (
                                <><Save size={16} /> Save Product</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
