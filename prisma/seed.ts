import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PRODUCTS } from '../models/products';
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Clearing existing products...');
    await prisma.product.deleteMany({});

    console.log(`Seeding ${PRODUCTS.length} products to Supabase...`);

    for (const item of PRODUCTS) {
        const createdProduct = await prisma.product.create({
            data: {
                id: item.id, // Keeping the same IDs from mock so frontend layout doesn't break
                name: item.name,
                price: item.price,
                category: item.category,
                imageUrl: item.image,
                description: item.description || 'A timeless Prime Store piece.',
                stock: 50, // Default stock assigned for demo
                isArchived: false,
            }
        });
        console.log(`Created: ${createdProduct.name}`);
    }

    console.log('✅ Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
