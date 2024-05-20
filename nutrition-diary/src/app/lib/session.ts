"use server";

import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

interface SessionPayload extends JWTPayload {
    userId: number;
}

const secretKey = process.env.X_APP_KEY
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        });
        return payload;
    }
    catch(error) {
        console.log("Failed to verify session");
        return undefined;
    }
}

export async function createSession(userId: number) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({userId, expiresAt});

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        path: '/'
    });
}

export async function updateSession() {
    const session = cookies().get('session')?.value
    const payload = await decrypt(session);

    if(!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        path: '/'
    });
}

export async function deleteSession() {
    cookies().delete('session');
}

export async function verifySession() {
    return { isAuth: true, userId: 4 }
}