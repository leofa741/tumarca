// app/api/online/heartbeat/route.ts
import { registerVisitor } from '@/lib/onlineStore';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const { visitorId, page, timestamp } = await request.json();
    
    if (!visitorId) {
      return NextResponse.json(
        { error: 'visitorId es requerido' }, 
        { status: 400 }
      );
    }

    registerVisitor(visitorId, page);

    return NextResponse.json({ 
      success: true, 
      timestamp: Date.now() 
    });
    
  } catch (error) {
    console.error('❌ Error en heartbeat:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}