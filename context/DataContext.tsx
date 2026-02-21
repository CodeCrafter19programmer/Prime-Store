'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/models/products';

export interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    email: string;
    address: string;
    city: string;
    phone: string;
    totalAmount: number;
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    date: string;
    items: {
        id: string;
        productId: string;
        name: string;
        imageUrl: string;
        quantity: number;
        price: number;
        size?: string;
        color?: string;
    }[];
}

interface DataContextType {
    products: Product[];
    orders: Order[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    addOrder: (order: any) => void;
    updateOrderStatus: (id: string, status: Order['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial Load
    useEffect(() => {
        const fetchLiveProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Failed to fetch live products', error);
            }
        };

        fetchLiveProducts();

        const fetchLiveOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Failed to fetch live orders', error);
            }
        };

        fetchLiveProducts();
        fetchLiveOrders();
        setIsLoaded(true);
    }, []);

    // Save Orders on Change


    // Removed localStorage hooks entirely for live data


    const addProduct = (newProduct: Omit<Product, 'id'>) => {
        const product = { ...newProduct, id: Math.random().toString(36).substr(2, 9) };
        setProducts(prev => [product, ...prev]);
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    };

    const updateOrderStatus = async (id: string, status: Order['status']) => {
        // Optimistic UI updates
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

        try {
            await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
        } catch (error) {
            console.error('Failed to update order status natively', error);
            // In a real app we'd revert the optimistic update here if it failed
        }
    };

    return (
        <DataContext.Provider value={{
            products,
            orders,
            addProduct,
            updateProduct,
            deleteProduct,
            addOrder,
            updateOrderStatus
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
