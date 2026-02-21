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
        imageUrl: '',
        description: 'A timeless staple.',
        stock: 50, isNew: true,
        popularity: 90
    },
    {
        id: '2',
        name: 'Oversized Denim Jacket',
        price: 120.00,
        category: 'women',
        imageUrl: '',
        stock: 50, isNew: false,
        popularity: 85
    },
    {
        id: '3',
        name: 'Pleated Trousers',
        price: 85.00,
        category: 'men',
        imageUrl: '',
        stock: 50, isNew: false,
        popularity: 70
    },
    {
        id: '4',
        name: 'Silk Blouse',
        price: 95.00,
        category: 'women',
        imageUrl: '',
        stock: 50, isNew: true,
        popularity: 88
    },

    // Footwear
    {
        id: '5',
        name: 'Leather Boots',
        price: 210.00,
        category: 'footwear',
        imageUrl: '',
        stock: 50, isNew: true,
        popularity: 95
    },
    {
        id: '6',
        name: 'Minimalist Sneakers',
        price: 135.00,
        category: 'footwear',
        imageUrl: '',
        stock: 50, isNew: true,
        popularity: 92
    },

    // Accessories (Watches/Jewelry/Bags)
    {
        id: '7',
        name: 'Minimalist Watch',
        price: 150.00,
        category: 'watches',
        imageUrl: '',
        stock: 50, isNew: false,
        popularity: 80
    },
    {
        id: '8',
        name: 'Gold Chain Necklace',
        price: 250.00,
        category: 'jewelry',
        imageUrl: '',
        stock: 50, isNew: true,
        popularity: 89
    },
    {
        id: '9',
        name: 'Leather Tote Bag',
        price: 320.00,
        category: 'bags',
        imageUrl: '',
        stock: 50, isNew: false,
        popularity: 75
    },
    {
        id: '10',
        name: 'Acetate Sunglasses',
        price: 180.00,
        category: 'eyewear',
        imageUrl: '',
        stock: 50, isNew: true,
        popularity: 82
    },

    // Wearable Tech
    {
        id: '11',
        name: 'Smart Fitness Ring',
        price: 299.00,
        category: 'wearable-tech',
        imageUrl: '',
        description: 'Track your health in style.',
        stock: 50, isNew: true,
        popularity: 98
    },
    {
        id: '12',
        name: 'VR Headset Pro',
        price: 499.00,
        category: 'wearable-tech',
        imageUrl: '',
        stock: 50, isNew: true,
        popularity: 91
    },
    {
        id: '13',
        name: 'Smart Knit Runner',
        price: 180.00,
        category: 'footwear',
        imageUrl: '',
        description: 'Sneakers with embedded step tracking.',
        stock: 50, isNew: true,
        popularity: 88
    },
    {
        id: '14',
        name: 'Tech Fleece Hoodie',
        price: 120.00,
        category: 'clothing',
        imageUrl: '',
        stock: 50, isNew: false,
        popularity: 94
    }
];
