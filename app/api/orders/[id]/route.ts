import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Update existing order status
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                status: body.status as OrderStatus,
            }
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Failed to update order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Ensure cascading deletions logic runs safely via Prisma mappings
        // First, delete order items matching this order
        await prisma.orderItem.deleteMany({
            where: { orderId: id }
        });

        // Next, delete the parent order
        const deletedOrder = await prisma.order.delete({
            where: { id }
        });

        return NextResponse.json(deletedOrder);
    } catch (error) {
        console.error('Failed to delete order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
