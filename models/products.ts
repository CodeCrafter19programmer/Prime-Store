export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    description?: string;
    stock: number;
    isNew?: boolean;
    popularity?: number;
}

export const PRODUCTS: Product[] = [
    // Clothing (Men/Women)
    {
        id: '1',
        name: 'Classic White Tee',
        price: 45.00,
        category: 'men',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop',
        description: 'A timeless staple.',
        stock: 50, isNew: true,
        popularity: 90
    },
    {
        id: '2',
        name: 'Oversized Denim Jacket',
        price: 120.00,
        category: 'women',
        imageUrl: 'https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=1887&auto=format&fit=crop',
        stock: 50, isNew: false,
        popularity: 85
    },
    {
        id: '3',
        name: 'Pleated Trousers',
        price: 85.00,
        category: 'men',
        imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1887&auto=format&fit=crop',
        stock: 50, isNew: false,
        popularity: 70
    },
    {
        id: '4',
        name: 'Silk Blouse',
        price: 95.00,
        category: 'women',
        imageUrl: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=1896&auto=format&fit=crop',
        stock: 50, isNew: true,
        popularity: 88
    },

    // Footwear
    {
        id: '5',
        name: 'Leather Boots',
        price: 210.00,
        category: 'footwear',
        imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b69f?q=80&w=1887&auto=format&fit=crop',
        stock: 50, isNew: true,
        popularity: 95
    },
    {
        id: '6',
        name: 'Minimalist Sneakers',
        price: 135.00,
        category: 'footwear',
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070',
        stock: 50, isNew: true,
        popularity: 92
    },

    // Accessories (Watches/Jewelry/Bags)
    {
        id: '7',
        name: 'Minimalist Watch',
        price: 150.00,
        category: 'watches',
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop',
        stock: 50, isNew: false,
        popularity: 80
    },
    {
        id: '8',
        name: 'Gold Chain Necklace',
        price: 250.00,
        category: 'jewelry',
        imageUrl: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1780',
        stock: 50, isNew: true,
        popularity: 89
    },
    {
        id: '9',
        name: 'Leather Tote Bag',
        price: 320.00,
        category: 'bags',
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935',
        stock: 50, isNew: false,
        popularity: 75
    },
    {
        id: '10',
        name: 'Acetate Sunglasses',
        price: 180.00,
        category: 'eyewear',
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080',
        stock: 50, isNew: true,
        popularity: 82
    },

    // Wearable Tech
    {
        id: '11',
        name: 'Smart Fitness Ring',
        price: 299.00,
        category: 'wearable-tech',
        imageUrl: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1780',
        description: 'Track your health in style.',
        stock: 50, isNew: true,
        popularity: 98
    },
    {
        id: '12',
        name: 'VR Headset Pro',
        price: 499.00,
        category: 'wearable-tech',
        imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?q=80&w=2070',
        stock: 50, isNew: true,
        popularity: 91
    },
    {
        id: '13',
        name: 'Smart Knit Runner',
        price: 180.00,
        category: 'footwear',
        imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964',
        description: 'Sneakers with embedded step tracking.',
        stock: 50, isNew: true,
        popularity: 88
    },
    {
        id: '14',
        name: 'Tech Fleece Hoodie',
        price: 120.00,
        category: 'clothing',
        imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070',
        stock: 50, isNew: false,
        popularity: 94
    }
];
