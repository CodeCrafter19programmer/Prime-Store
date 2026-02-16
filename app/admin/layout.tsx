'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Users, BarChart2, PackageOpen } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === '/admin/login';
    const [isAuthed, setIsAuthed] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (isLoginPage) {
            setIsChecking(false);
            return;
        }
        const session = localStorage.getItem('admin_session');
        if (!session) {
            router.push('/admin/login');
        } else {
            setIsAuthed(true);
        }
        setIsChecking(false);
    }, [isLoginPage, router]);

    if (isLoginPage) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">{children}</div>;
    }

    if (isChecking || !isAuthed) {
        return null;
    }

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
        { name: 'Customers', href: '/admin/customers', icon: Users },
        { name: 'Inventory', href: '/admin/inventory', icon: PackageOpen },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black fixed h-full z-20 hidden md:block">
                <div className="h-20 flex items-center px-8 border-b border-gray-100 dark:border-gray-900">
                    <span className="text-xl font-bold uppercase tracking-tighter">Prime Admin</span>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition-colors ${isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-900">
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_session');
                            window.location.href = '/admin/login';
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full rounded-sm transition-colors"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64">
                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 px-8 flex items-center justify-between">
                    <h2 className="font-bold text-lg capitalize">{pathname.split('/').slice(-1)[0] || 'Dashboard'}</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">A</div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
