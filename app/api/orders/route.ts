import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                imageUrl: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        // Format for DataContext / Orders page expectations
        const formattedOrders = orders.map(order => ({
            id: order.id,
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            email: order.email,
            address: order.address,
            city: order.city,
            phone: order.phone,
            totalAmount: order.totalAmount,
            status: order.status,
            date: order.createdAt.toISOString(),
            items: order.items.map(item => ({
                id: item.id,
                productId: item.productId,
                name: item.product.name,
                imageUrl: item.product.imageUrl,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                color: item.color
            }))
        }));

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, email, address, city, phone, totalAmount, items } = body;

        // Create Order and perform stock reduction in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create Order
            const newOrder = await tx.order.create({
                data: {
                    orderNumber: `PRIME-${Math.floor(Math.random() * 100000)}`,
                    customerName,
                    email,
                    address,
                    city,
                    phone,
                    totalAmount,
                    status: 'PENDING',
                    items: {
                        create: items.map((item: any) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                            size: item.size,
                            color: item.color
                        }))
                    }
                },
                include: {
                    items: true
                }
            });

            // 2. Reduce Stock amounts for each product
            for (const item of items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
            }

            return newOrder;
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Failed to create order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
