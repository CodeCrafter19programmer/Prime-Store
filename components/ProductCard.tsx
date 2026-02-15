'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
}

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCartAnimation } from '@/context/CartAnimationContext';
import { Heart } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { startAnimation } = useCartAnimation();
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        startAnimation(rect, product.image);

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
    };

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4 rounded-sm">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <button
                    onClick={toggleWishlist}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 transform ${inWishlist ? 'opacity-100 scale-100 bg-white/80 dark:bg-black/80' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 hover:bg-white/50 dark:hover:bg-black/50'}`}
                >
                    <Heart size={16} className={inWishlist ? 'fill-red-500 text-red-500' : 'text-black dark:text-white'} />
                </button>

                {/* Glassmorphic "Add to Cart" that slides up */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-white/70 dark:bg-black/70 backdrop-blur-md text-black dark:text-white py-3 text-sm font-medium hover:bg-white dark:hover:bg-black uppercase tracking-wider border border-white/20 dark:border-gray-700 transition-colors">
                        Add to Cart
                    </button>
                </div>

                {/* Badges could go here (e.g. Sale) */}
            </div>
            <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wide">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Shs {product.price.toLocaleString()}</p>
            </div>
        </Link>
    )
}
