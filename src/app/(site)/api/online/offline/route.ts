// app/api/online/offline/route.ts
import { NextResponse } from 'next/server';
import { removeVisitor } from '@/lib/onlineStore';

export async function POST(request: Request) {
  try {
    const { visitorId } = await request.json();
    
    if (visitorId) {
      removeVisitor(visitorId);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    // No fallar si hay error en el cleanup offline
    console.warn('⚠️ Error en offline cleanup:', error);
    return NextResponse.json({ success: false });
  }
}