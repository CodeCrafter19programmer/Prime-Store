'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useData } from '@/context/DataContext';
import { ShoppingCart, Star, X } from 'lucide-react';
import Image from 'next/image';

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { products } = useData();

    // Filter products that are in the wishlist
    const wishlistItems = products.filter(product =>
        wishlist.some(item => item.id === product.id)
    );

    if (wishlistItems.length === 0) {
        return (
            <div className="text-center py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <Star size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-8">Start saving your favorite items for later.</p>
                <Link
                    href="/shop"
                    className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:opacity-80 transition-opacity rounded-lg"
                >
                    Explore Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {wishlistItems.map((product) => (
                <div key={product.id} className="group relative">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3 rounded-lg">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                        />
                        <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white dark:bg-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 min-w-[36px] min-h-[36px] flex items-center justify-center"
                            aria-label={`Remove ${product.name} from wishlist`}
                        >
                            <X size={14} />
                        </button>
                    </div>

                    <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="min-w-0">
                            <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wide truncate">
                                {product.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-gray-500 capitalize">
                                {product.category}
                            </p>
                        </div>
                        <p className="font-bold text-xs sm:text-sm flex-shrink-0">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <Link
                        href={`/product/${product.id}`}
                        className="w-full mt-2 bg-black dark:bg-white text-white dark:text-black py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 rounded-lg"
                    >
                        <ShoppingCart size={13} /> View Product
                    </Link>
                </div>
            ))}
        </div>
    );
}
