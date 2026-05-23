import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSession, SESSION_COOKIE, SESSION_DURATION } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const expectedPassword = process.env.AUTH_PASSWORD;
    
    if (!expectedPassword) {
      console.error('AUTH_PASSWORD environment variable is not set');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Use timing-safe comparison to prevent timing attacks
    const passwordBuffer = Buffer.from(password);
    const expectedBuffer = Buffer.from(expectedPassword);

    // Ensure buffers are the same length before comparison
    if (
      passwordBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(passwordBuffer, expectedBuffer)
    ) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Password is correct, create a session
    const token = await createSession();

    const response = NextResponse.json({ success: true }, { status: 200 });

    // Set the session cookie
    response.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
