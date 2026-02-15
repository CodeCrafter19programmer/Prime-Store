'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { ChevronLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewProduct() {
    const router = useRouter();
    const { addProduct } = useData();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'clothing',
        description: '',
        image: ''
    });

    const categories = ['clothing', 'accessories', 'footwear', 'jewelry', 'electronics'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addProduct({
            name: formData.name,
            price: parseFloat(formData.price),
            category: formData.category,
            description: formData.description,
            image: formData.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop' // Placeholder default
        });
        router.push('/admin/products');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                            <label className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Image URL</label>
                            <input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                type="url"
                                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-3 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                                placeholder="https://example.com/image.jpg"
                            />
                            <p className="text-xs text-gray-500">Enter a direct image link. If empty, a placeholder will be used.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 p-3 rounded-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors h-32 resize-none"
                            placeholder="Product details..."
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                        <Link
                            href="/admin/products"
                            className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity rounded-sm"
                        >
                            <Save size={16} /> Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
