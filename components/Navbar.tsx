'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

// Animation Variants
const menuVariants = {
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.3,
            when: "afterChildren"
        }
    },
    open: {
        opacity: 1,
        height: '100vh',
        transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
};

const megaMenuVariants = {
    hidden: { opacity: 0, y: -10, display: 'none' },
    visible: { opacity: 1, y: 0, display: 'block', transition: { duration: 0.2 } },
};

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Mobile Menu
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { itemCount } = useCart();
    const { isLoggedIn, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter(); // usually already imported, but let me check lines 1-13.
    // Line 10: import { usePathname } from 'next/navigation';
    // I need to import useRouter if not already imported. Ah, line 10 only imports usePathname. I need to update imports too.

    const handleSearchSubmit = (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide Navbar on Admin pages
    if (pathname?.startsWith('/admin')) return null;

    const navLinks = [
        { name: 'Men', href: '/shop?category=men' },
        { name: 'Women', href: '/shop?category=women' },
        { name: 'Wearable Tech', href: '/shop?category=wearable-tech' },
        { name: 'Accessories', href: '/shop?category=accessories' },
        { name: 'Sports Kit', href: '/shop?category=sports-kit' },
        { name: 'New Arrivals', href: '/shop?sort=newest' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen || isMegaMenuOpen ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
                    }`}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-28">
                        {/* Logo */}
                        <Link href="/" onClick={() => setIsOpen(false)} className="relative z-50">
                            <Image
                                src="/logo.png"
                                alt="Prime Store - Wear Prime"
                                width={240}
                                height={120}
                                className="object-contain h-32 w-auto dark:invert scale-125" // Increased height and scale
                                priority
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center h-full">

                            {/* Shop Trigger for Mega Menu */}
                            <div
                                className="h-full flex items-center"
                                onMouseEnter={() => setIsMegaMenuOpen(true)}
                            >
                                <Link
                                    href="/shop"
                                    className="text-sm font-medium hover:text-gray-500 dark:hover:text-gray-300 transition-colors uppercase tracking-wide flex items-center gap-1"
                                >
                                    Shop <ChevronDown size={14} />
                                </Link>
                            </div>

                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium hover:text-gray-500 dark:hover:text-gray-300 transition-colors uppercase tracking-wide"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Icons */}
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="flex items-center">
                                <AnimatePresence>
                                    {isSearchOpen && (
                                        <motion.form
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 200, opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            onSubmit={handleSearchSubmit}
                                            className="overflow-hidden mr-2"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search products..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full bg-transparent border-b border-black dark:border-white text-sm py-1 outline-none placeholder:text-gray-400"
                                                autoFocus
                                                onBlur={() => !searchQuery && setIsSearchOpen(false)}
                                            />
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                                <button
                                    onClick={(e) => {
                                        if (isSearchOpen && searchQuery) {
                                            handleSearchSubmit(e);
                                        } else {
                                            setIsSearchOpen(!isSearchOpen);
                                        }
                                    }}
                                    className="hover:text-gray-500 transition-colors"
                                >
                                    <Search size={20} strokeWidth={1.5} />
                                </button>
                            </div>
                            <Link href="/cart" className="relative hover:text-gray-500 transition-colors">
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="hover:text-gray-500 transition-colors flex items-center"
                                >
                                    <User size={20} strokeWidth={1.5} />
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-full mt-4 w-48 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 shadow-xl rounded-sm py-2"
                                            onMouseLeave={() => setIsUserMenuOpen(false)}
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                                <p className="text-xs font-bold uppercase text-gray-500">
                                                    {isLoggedIn ? 'Welcome' : 'Account'}
                                                </p>
                                            </div>
                                            <div className="py-2">
                                                {isLoggedIn ? (
                                                    <>
                                                        <Link
                                                            href="/account"
                                                            className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                        >
                                                            My Account
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                logout();
                                                                setIsUserMenuOpen(false);
                                                            }}
                                                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                                        >
                                                            Sign Out
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link
                                                            href="/register"
                                                            className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-bold"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                        >
                                                            Create Account
                                                        </Link>
                                                        <Link
                                                            href="/login"
                                                            className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                        >
                                                            Sign In
                                                        </Link>
                                                        <div className="px-4 py-2 text-sm text-gray-300 dark:text-gray-700 cursor-not-allowed">
                                                            My Account
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Mobile Button */}
                        <div className="md:hidden relative z-50">
                            <button onClick={() => setIsOpen(!isOpen)} className="p-2 transition-transform active:scale-95">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {isMegaMenuOpen && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={megaMenuVariants}
                            className="absolute top-full left-0 right-0 bg-white/98 dark:bg-black/98 border-t border-gray-100 dark:border-gray-800 backdrop-blur-md shadow-lg"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                                <div className="grid grid-cols-3 gap-12">
                                    {/* Column 1 */}
                                    <div>
                                        <h3 className="font-bold uppercase tracking-wider mb-6 text-sm border-b pb-2">Core Fashion</h3>
                                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                            <li><Link href="/shop?category=clothing" className="hover:text-black dark:hover:text-white transition-colors">Clothing</Link></li>
                                            <li><Link href="/shop?category=footwear" className="hover:text-black dark:hover:text-white transition-colors">Footwear</Link></li>
                                            <li><Link href="/shop?category=bags" className="hover:text-black dark:hover:text-white transition-colors">Bags</Link></li>
                                            <li><Link href="/shop?category=watches" className="hover:text-black dark:hover:text-white transition-colors">Watches</Link></li>
                                        </ul>
                                    </div>

                                    {/* Column 2 */}
                                    <div>
                                        <h3 className="font-bold uppercase tracking-wider mb-6 text-sm border-b pb-2">Style Enhancers</h3>
                                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                            <li><Link href="/shop?category=jewelry" className="hover:text-black dark:hover:text-white transition-colors">Jewelry</Link></li>
                                            <li><Link href="/shop?category=eyewear" className="hover:text-black dark:hover:text-white transition-colors">Eyewear</Link></li>
                                            <li><Link href="/shop?category=headwear" className="hover:text-black dark:hover:text-white transition-colors">Headwear & Hair</Link></li>
                                            <li><Link href="/shop?category=belts" className="hover:text-black dark:hover:text-white transition-colors">Belts & Scarves</Link></li>
                                        </ul>
                                    </div>

                                    {/* Column 3 */}
                                    <div>
                                        <h3 className="font-bold uppercase tracking-wider mb-6 text-sm border-b pb-2 text-blue-600 dark:text-blue-400">Modern / Smart</h3>
                                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                            <li><Link href="/shop?category=wearable-tech" className="hover:text-black dark:hover:text-white transition-colors font-medium">Wearable Tech</Link></li>
                                            <li><Link href="/shop?category=smart-fashion" className="hover:text-black dark:hover:text-white transition-colors">Smart Fashion</Link></li>
                                            <li><Link href="/shop?category=body-enhancers" className="hover:text-black dark:hover:text-white transition-colors">Body Enhancers</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden fixed inset-0 bg-white dark:bg-black z-40 pt-32"
                    >
                        <div className="px-4 py-6 space-y-6 flex flex-col items-center text-center overflow-y-auto max-h-screen pb-20">
                            {[{ name: 'Shop', href: '/shop' }, ...navLinks].map((item) => (
                                <motion.div key={item.name} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-bold uppercase tracking-tight hover:text-gray-500 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={itemVariants} className="pt-8 flex justify-center space-x-12 w-full border-t border-gray-100 dark:border-gray-800 mt-4">
                                <button><Search size={28} strokeWidth={1.5} /></button>
                                <Link href="/cart" onClick={() => setIsOpen(false)} className="relative">
                                    <ShoppingBag size={28} strokeWidth={1.5} />
                                    {itemCount > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                            {itemCount}
                                        </span>
                                    )}
                                </Link>
                                <Link href="/account" onClick={() => setIsOpen(false)}><User size={28} strokeWidth={1.5} /></Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
