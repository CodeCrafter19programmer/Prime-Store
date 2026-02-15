'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, Product } from '@/models/products';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable Filter Section Component
const FilterSection = ({
    title,
    isOpen,
    onToggle,
    children
}: {
    title: string,
    isOpen: boolean,
    onToggle: () => void,
    children: React.ReactNode
}) => {
    return (
        <div className="mb-2">
            <button
                onClick={onToggle}
                className="w-full font-bold py-3 uppercase text-sm tracking-wider border-b border-gray-100 dark:border-gray-800 flex items-center justify-between hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
                {title}
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} strokeWidth={1.5} />
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="py-4 space-y-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Shop() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopContent />
        </Suspense>
    )
}

function ShopContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryParam = searchParams.get('category') || 'all';
    const sortParam = searchParams.get('sort') || 'popular';
    const collectionParam = searchParams.get('collection');
    const searchParam = searchParams.get('search');

    // State for filters
    const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 1000 });
    const [itemsToShow, setItemsToShow] = useState(6);

    // State for Collapsible Sections
    const [openSections, setOpenSections] = useState({
        categories: true,
        price: true,
        size: false,
        color: false
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section as keyof typeof prev] }));
    };

    // Filtering Logic
    const filteredProducts = PRODUCTS.filter(product => {
        // Search Filter
        if (searchParam) {
            const query = searchParam.toLowerCase();
            const matchesSearch =
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                (product.description && product.description.toLowerCase().includes(query));

            if (!matchesSearch) return false;
        }

        // Category Filter
        let matchCategory = true;
        if (categoryParam !== 'all') {
            if (categoryParam === 'men' || categoryParam === 'women') {
                // For simplicity in this mock, men/women might just return clothing or specific items
                // But if products have explicit 'men' or 'women' category, match that.
                // ALSO, let's include 'clothing' if filtered by men/women for demo purposes if we don't have enough data
                matchCategory = product.category === categoryParam;
            } else {
                matchCategory = product.category === categoryParam;
            }
        }

        // Collection Filter (Mock logic)
        if (collectionParam) {
            // In a real app, products would have a collectionId. Here we'll just random match for demo
            if (collectionParam === 'streetwear') matchCategory = ['clothing', 'footwear'].includes(product.category);
            if (collectionParam === 'smart') matchCategory = ['wearable-tech', 'watches'].includes(product.category);
            if (collectionParam === 'jewelry') matchCategory = ['jewelry', 'watches'].includes(product.category);
        }

        const matchPrice = product.price >= priceRange.min && product.price <= priceRange.max;
        return matchCategory && matchPrice;
    }).sort((a, b) => {
        switch (sortParam) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'newest': return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
            case 'popular': default: return (b.popularity || 0) - (a.popularity || 0);
        }
    });

    const handleCategoryChange = (cat: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (cat === 'all') params.delete('category');
        else params.set('category', cat);
        params.delete('collection'); // Clear collection when category selected
        router.push(`/shop?${params.toString()}`);
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`/shop?${params.toString()}`);
    }

    // Dynamic Header Info
    const getHeaderInfo = () => {
        if (searchParam) {
            return {
                title: 'Search Results',
                desc: `Showing results for "${searchParam}"`,
                image: null
            };
        }
        if (collectionParam) {
            return {
                title: `${collectionParam} Collection`,
                desc: 'Curated just for you.',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070'
            };
        }
        switch (categoryParam) {
            case 'wearable-tech': return {
                title: 'Wearable Tech',
                desc: 'Future-forward gear for the modern human.',
                image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2070'
            };
            case 'men': return {
                title: 'Men\'s Collection',
                desc: 'Timeless staples and modern cuts.',
                image: 'https://images.unsplash.com/photo-1488161628813-99c974fc7994?q=80&w=2070'
            };
            case 'women': return {
                title: 'Women\'s Collection',
                desc: 'Elegant designs for every occasion.',
                image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=2070'
            };
            case 'footwear': return {
                title: 'Footwear',
                desc: 'Step out in style and comfort.',
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070'
            };
            case 'accessories': return {
                title: 'Accessories',
                desc: 'The finishing touches defined.',
                image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070'
            };
            default: return {
                title: 'Shop Collection',
                desc: 'Explore our premium collection of timeless fashion pieces.',
                image: null
            };
        }
    };

    const headerInfo = getHeaderInfo();

    const categoriesList = [
        { id: 'all', label: 'All Products' },
        { id: 'clothing', label: 'Clothing' },
        { id: 'footwear', label: 'Footwear' },
        { id: 'wearable-tech', label: 'Wearable Tech' },
        { id: 'watches', label: 'Watches' },
        { id: 'jewelry', label: 'Jewelry' },
        { id: 'bags', label: 'Bags' },
        { id: 'eyewear', label: 'Eyewear' },
    ];

    return (
        <div className="min-h-screen">
            {/* Header / Hero */}
            <div className={`relative ${headerInfo.image ? 'h-[40vh] flex items-center justify-center bg-black/50' : 'pt-32 pb-12'}`}>
                {headerInfo.image && (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0"
                            style={{ backgroundImage: `url(${headerInfo.image})` }}
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                    </>
                )}
                <div className={`relative z-20 text-center px-4 max-w-7xl mx-auto ${headerInfo.image ? 'text-white' : ''}`}>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tighter">{headerInfo.title}</h1>
                    <p className={`text-lg max-w-2xl mx-auto capitalize ${headerInfo.image ? 'text-white/90' : 'text-gray-500'}`}>{headerInfo.desc}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                {/* Filter Sidebar */}
                <div className="hidden lg:block w-64 flex-shrink-0 space-y-2 sticky top-32 h-fit">

                    <FilterSection
                        title="Categories"
                        isOpen={openSections.categories}
                        onToggle={() => toggleSection('categories')}
                    >
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            {categoriesList.map(cat => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`text-left w-full hover:text-black dark:hover:text-white transition-colors capitalize ${categoryParam === cat.id ? 'font-bold text-black dark:text-white' : ''}`}
                                    >
                                        {cat.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </FilterSection>

                    <FilterSection
                        title="Price Range"
                        isOpen={openSections.price}
                        onToggle={() => toggleSection('price')}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm">
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                    className="w-full border border-gray-200 dark:border-gray-800 bg-transparent p-2 rounded-sm outline-none focus:border-black dark:focus:border-white"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                    className="w-full border border-gray-200 dark:border-gray-800 bg-transparent p-2 rounded-sm outline-none focus:border-black dark:focus:border-white"
                                />
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                className="w-full accent-black dark:accent-white h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </FilterSection>

                    {/* New Mock Filters */}
                    <FilterSection
                        title="Size"
                        isOpen={openSections.size}
                        onToggle={() => toggleSection('size')}
                    >
                        <div className="grid grid-cols-4 gap-2">
                            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                <button key={size} className="border border-gray-200 dark:border-gray-800 py-1 text-xs hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">{size}</button>
                            ))}
                        </div>
                    </FilterSection>


                </div>

                {/* Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
                        <span className="font-medium text-black dark:text-white">{filteredProducts.length} Products</span>

                        <div className="flex items-center gap-4">
                            <div className="lg:hidden flex items-center gap-2 font-bold uppercase text-xs cursor-pointer">
                                <SlidersHorizontal size={14} /> Filters
                            </div>
                            <select
                                value={sortParam}
                                onChange={handleSortChange}
                                className="border-none bg-transparent outline-none cursor-pointer font-medium hover:text-black dark:hover:text-white"
                            >
                                <option value="popular">Sort by: Popular</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {filteredProducts.slice(0, itemsToShow).map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-gray-500">
                            <p className="text-lg">No products found matching your criteria.</p>
                            <button onClick={() => handleCategoryChange('all')} className="mt-4 underline hover:text-black dark:hover:text-white">Clear Filters</button>
                        </div>
                    )}

                    {filteredProducts.length > itemsToShow && (
                        <div className="mt-16 text-center">
                            <button
                                onClick={() => setItemsToShow(prev => prev + 6)}
                                className="border border-black dark:border-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
