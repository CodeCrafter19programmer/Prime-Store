'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.JWT_SECRET || 'a-very-secure-secret-fallback-key-for-admin-login';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

export async function adminLogin(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simple hardcoded admin credentials for now until DB is linked
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@primestore.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'primeAdmin123!';

    if (email === adminEmail && password === adminPassword) {
        // Create JWT
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
        const session = await encrypt({ role: 'admin', email });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires,
        });

        return { success: true };
    } else {
        return { success: false, error: 'Invalid email or password' };
    }
}

export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}
