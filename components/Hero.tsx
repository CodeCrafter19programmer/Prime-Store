'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900">
                {/* Placeholder Image from Unsplash */}
                <div
                    className="absolute inset-0 bg-gray-800"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
                >
                    PRIME STORE
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto"
                >
                    The new standard in modern aesthetic and premium fashion.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link
                        href="/shop"
                        className="inline-block bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-all transform hover:scale-105 duration-300"
                    >
                        Shop Collection
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
