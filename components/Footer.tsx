'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="block w-fit">
                            <Image
                                src="/logo.png"
                                alt="Prime Store - Wear Prime"
                                width={120}
                                height={60}
                                className="object-contain h-10 w-auto dark:invert"
                            />
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            <strong className="block text-black dark:text-white mb-2 tracking-widest uppercase text-xs">Wear Prime.</strong>
                            Elevating your everyday style with premium quality and timeless design. We believe in sustainable fashion that lasts.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link href="/shop?category=men" className="hover:text-black dark:hover:text-white transition-colors">Men</Link></li>
                            <li><Link href="/shop?category=women" className="hover:text-black dark:hover:text-white transition-colors">Women</Link></li>
                            <li><Link href="/shop?category=jewellery" className="hover:text-black dark:hover:text-white transition-colors">Jewellery</Link></li>
                            <li><Link href="/shop?sort=newest" className="hover:text-black dark:hover:text-white transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Help</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-black dark:hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-black dark:hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Follow Us</h4>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Instagram size={22} strokeWidth={1.5} /></a>
                            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Twitter size={22} strokeWidth={1.5} /></a>
                            <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Facebook size={22} strokeWidth={1.5} /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>&copy; 2026 Prime Store. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed for Excellence.</p>
                </div>
            </div>
        </footer>
    )
}
