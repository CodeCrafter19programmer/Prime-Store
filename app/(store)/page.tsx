import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for "New Arrivals" - kept for "Trending Now" section
const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Smart Knit Runner',
    price: 145.00,
    category: 'Footwear',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Tech Fleece Hoodie',
    price: 120.00,
    category: 'Men',
    imageUrl: 'https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=1887&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Minimalist Chrono',
    price: 185.00,
    category: 'Watches',
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1780&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Connected Ring',
    price: 295.00,
    category: 'Wearable Tech',
    imageUrl: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1780&auto=format&fit=crop'
  },
];

const CATEGORIES = [
  { name: 'Clothing', image: 'https://images.unsplash.com/photo-1551488852-080175ddbe60?q=80&w=2070', href: '/shop?category=clothing' },
  { name: 'Sports Kit', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070', href: '/shop?category=sports-kit' },
  { name: 'Wearable Tech', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2070', href: '/shop?category=wearable-tech' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070', href: '/shop?category=footwear' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070', href: '/shop?category=accessories' },
];

const COLLECTIONS = [
  { name: 'Streetwear Essentials', image: 'https://images.unsplash.com/photo-1523396870777-19123f67b5fc?q=80&w=1780', href: '/shop?collection=streetwear' },
  { name: 'Smart & Stylish', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070', href: '/shop?collection=smart' },
  { name: 'Minimalist Jewelry', image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1780', href: '/shop?collection=jewelry' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* SHOP BY CATEGORY (GRID) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4">Shop By Category</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore our curated selection of premium essentials and future-forward gear.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group block relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold uppercase tracking-wider">{cat.name}</h3>
                <span className="text-white/80 text-sm border-b border-transparent group-hover:border-white transition-all inline-block mt-2">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 uppercase tracking-tight">Curated Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COLLECTIONS.map((col, index) => (
              <Link
                key={col.name}
                href={col.href}
                className={`relative group overflow-hidden h-[500px] rounded-sm ${index === 1 ? 'md:-mt-12' : ''}`}
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-white text-3xl font-bold uppercase tracking-widest mb-4">{col.name}</h3>
                  <span className="px-6 py-2 border-2 border-white text-white font-bold uppercase text-xs hover:bg-white hover:text-black transition-colors">
                    View Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-sm font-bold text-gray-400 tracking-wider uppercase">Fresh Drops</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">TRENDING NOW</h2>
          </div>
          <Link href="/shop" className="hidden md:block text-sm font-bold border-b border-black dark:border-white pb-1 hover:text-gray-600 transition-colors">
            VIEW ALL PRODUCTS
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 px-4 text-center border-t border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest">Join The Club</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Sign up for our newsletter and receive exclusive offers, early access to new collections, and style tips.</p>
        <div className="flex max-w-md mx-auto">
          <input type="email" placeholder="Your email address" className="flex-1 border border-gray-300 dark:border-gray-800 px-4 py-3 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors" />
          <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
