import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'a-very-secure-secret-fallback-key-for-admin-login';
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
    // Only run this logic on /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // If navigating to the login page, bypass
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const session = request.cookies.get('admin_session')?.value;

        if (!session) {
            // No session cookie, instantly redirect to login
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        try {
            // Verify JWT using jose (Edge Runtime compatible)
            const { payload } = await jwtVerify(session, key, {
                algorithms: ['HS256'],
            });

            if (payload.role !== 'admin') {
                throw new Error('Not an admin');
            }

            // If we reach here, it's a valid admin session
            return NextResponse.next();
        } catch (error) {
            // Bad token or expired, clear cookie and redirect
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_session');
            return response;
        }
    }

    return NextResponse.next();
}

// Ensure middleware runs only on /admin paths
export const config = {
    matcher: ['/admin/:path*'],
};
