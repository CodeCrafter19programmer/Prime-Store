'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/models/products';

export interface Order {
    id: string;
    customerName: string;
    email: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    items: {
        id: string;
        name: string;
        quantity: number;
        price: number;
    }[];
}

interface DataContextType {
    products: Product[];
    orders: Order[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
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

        // Load orders (still mocked for now until Phase 4 Order API)
        const savedOrders = localStorage.getItem('prime-orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        } else {
            // Seed some mock orders for demo
            setOrders([
                {
                    id: 'ORD-001',
                    customerName: 'John Doe',
                    email: 'john@example.com',
                    total: 120,
                    status: 'delivered',
                    date: new Date().toISOString(),
                    items: [{ id: '1', name: 'Classic Tee', quantity: 2, price: 60 }]
                }
            ]);
        }
        setIsLoaded(true);
    }, []);

    // Save Orders on Change


    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('prime-orders', JSON.stringify(orders));
        }
    }, [orders, isLoaded]);

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

    const addOrder = (newOrder: Omit<Order, 'id' | 'date' | 'status'>) => {
        const order: Order = {
            ...newOrder,
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toISOString(),
            status: 'pending'
        };
        setOrders(prev => [order, ...prev]);
    };

    const updateOrderStatus = (id: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
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
