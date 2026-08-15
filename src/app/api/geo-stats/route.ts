// app/api/geo-stats/route.ts
import Click from '@/app/lib/models/models/Click';
import { NextResponse } from 'next/server';


export async function GET() {
  const locations = await Click.aggregate([ 
    { $match: { city: { $exists: true } } },
    {
      $group: {
        _id: { country: '$country', region: '$region', city: '$city' },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 15 },
  ]);

  return NextResponse.json({ locations });
}