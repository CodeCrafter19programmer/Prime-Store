'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { usePathname } from 'next/navigation';

export default function StoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return (
        <CartProvider>
            <Navbar />
            <main className={`min-h-screen ${isHomePage ? '' : 'pt-32'}`}>
                {children}
            </main>
            <Footer />
        </CartProvider>
    );
}
