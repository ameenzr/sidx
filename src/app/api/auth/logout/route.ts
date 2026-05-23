import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  
  response.cookies.delete(SESSION_COOKIE);
  
  return response;
}
