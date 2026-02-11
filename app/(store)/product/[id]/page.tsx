'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useState, use } from 'react';
import { PRODUCTS } from '@/models/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState('M');

    // Find product
    const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

    // Related Products (Same category, exclude current)
    const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    // Fallback if no related items (show popular)
    const displayRelated = relatedProducts.length > 0 ? relatedProducts : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

    const isTech = product.category === 'wearable-tech';

    return (
        <div className="pt-32 px-4 max-w-7xl mx-auto min-h-screen pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                {/* Images */}
                <div className="space-y-4">
                    <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-sm">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Info */}
                <div className="sticky top-32 h-fit mb-12">
                    <div className="mb-8">
                        {product.isNew && <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">New Arrival</span>}
                        <h1 className="text-4xl lg:text-5xl font-bold mt-2 uppercase tracking-tight">{product.name}</h1>
                        <p className="text-2xl font-medium mt-4">Shs {product.price.toLocaleString()}</p>
                    </div>

                    <div className="prose dark:prose-invert text-gray-500 dark:text-gray-400 mb-10 max-w-none text-lg font-light leading-relaxed">
                        <p>{product.description || 'Experience premium quality and timeless design. Crafted for the modern individual who values both aesthetics and functionality.'}</p>
                    </div>

                    <div className="space-y-8 mb-10">


                        {!isTech && (
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Size</h3>
                                    <button className="text-xs text-gray-400 underline hover:text-black dark:hover:text-white">Size Guide</button>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`border py-3 text-sm font-medium transition-colors ${selectedSize === s ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                size: selectedSize
                            })}
                            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            Add to Cart
                        </button>
                        <button className="border border-gray-300 dark:border-gray-700 aspect-square flex items-center justify-center w-14 hover:border-black dark:hover:border-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-8 space-y-6">
                        {isTech && (
                            <details className="group cursor-pointer">
                                <summary className="flex justify-between items-center font-bold uppercase text-sm list-none select-none">
                                    Tech Specifications
                                    <span className="transition-transform group-open:rotate-180">+</span>
                                </summary>
                                <div className="text-sm text-gray-500 mt-3 leading-relaxed space-y-2">
                                    <div className="flex justify-between border-b border-gray-50 dark:border-gray-900 pb-2"><span>Battery Life</span><span>Up to 48 Hours</span></div>
                                    <div className="flex justify-between border-b border-gray-50 dark:border-gray-900 pb-2"><span>Connectivity</span><span>Bluetooth 5.3</span></div>
                                    <div className="flex justify-between border-b border-gray-50 dark:border-gray-900 pb-2"><span>Water Resistance</span><span>IP68</span></div>
                                </div>
                            </details>
                        )}
                        <details className="group cursor-pointer">
                            <summary className="flex justify-between items-center font-bold uppercase text-sm list-none select-none">
                                Details & Care
                                <span className="transition-transform group-open:rotate-180">+</span>
                            </summary>
                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">Machine wash cold. Do not bleach. Tumble dry low. Iron on low heat if needed.</p>
                        </details>
                        <details className="group cursor-pointer">
                            <summary className="flex justify-between items-center font-bold uppercase text-sm list-none select-none">
                                Shipping & Returns
                                <span className="transition-transform group-open:rotate-180">+</span>
                            </summary>
                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">Free shipping on all orders over $200. Returns accepted within 30 days of purchase. Items must be unworn and in original condition.</p>
                        </details>
                    </div>
                </div>
            </div>

            {/* Related Products / Complete The Look */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-20">
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-12 text-center">
                    {isTech ? 'Compatible Accessories' : 'Complete The Look'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayRelated.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}
