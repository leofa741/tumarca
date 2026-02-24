// app/api/online/count/route.ts
import { NextResponse } from 'next/server';
import { getOnlineCount } from '@/lib/onlineStore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || undefined;
    
    const count = getOnlineCount(page);
    
    return NextResponse.json({ 
      count,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo count:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}