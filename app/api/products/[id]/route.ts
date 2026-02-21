import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Wrap params in a Promise per Next.js 15+ deprecations
        const { id } = await params;
        const body = await request.json();

        // Update existing row
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description,
                price: body.price ? parseFloat(body.price) : undefined,
                category: body.category,
                imageUrl: body.imageUrl,
                stock: body.stock !== undefined ? parseInt(body.stock) : undefined,
                isArchived: body.isArchived,
            }
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Failed to update product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Delete the product completely
        // NOTE: If they have orders tied to them in production, 
        // it's usually better to 'archive' them rather than hard-delete to prevent foreign key errors. 
        // We'll hard delete here since there are no live orders blocking it right now.
        const deletedProduct = await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.error('Failed to delete product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
