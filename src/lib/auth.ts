import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'sidx-session';
export const SESSION_DURATION = 30 * 24 * 60 * 60; // 30 days in seconds

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET environment variable is required');
  }
  return new TextEncoder().encode(secret);
}

export async function createSession() {
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);
  
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecret());
    
  return token;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch (error) {
    return null; // Invalid or expired token
  }
}
