'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useData } from '@/context/DataContext';
import { ShoppingCart, Star, X } from 'lucide-react';

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { products } = useData();

    // Filter products that are in the wishlist
    const wishlistItems = products.filter(product =>
        wishlist.some(item => item.id === product.id)
    );

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">My Wishlist</h1>
            <p className="text-gray-500 mb-12">Your curated collection of favorites.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlistItems.map((product) => (
                    <div key={product.id} className="group relative">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                            />
                            <button
                                onClick={() => removeFromWishlist(product.id)}
                                className="absolute top-4 right-4 bg-white dark:bg-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wide">{product.name}</h3>
                                <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                            </div>
                            <p className="font-bold text-sm">${product.price.toFixed(2)}</p>
                        </div>

                        <Link
                            href={`/product/${product.id}`}
                            className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={14} /> View Product
                        </Link>
                    </div>
                ))}
            </div>

            {wishlistItems.length === 0 && (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-sm">
                    <Star size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-8">Start saving your favorite items for later.</p>
                    <Link href="/shop" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:opacity-80 transition-opacity">
                        Explore Shop
                    </Link>
                </div>
            )}
        </div>
    );
}
