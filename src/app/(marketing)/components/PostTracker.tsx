// app/(marketing)/components/PostTracker.tsx
'use client';

import { useSectionTracker } from './useSectionTracker';

export default function PostTracker({ slug, title }: { slug: string; title: string }) {
  const { ref } = useSectionTracker({
    sectionId: slug,
    sectionName: title, 
    minReadTime: 3000,
    onEngagement: (data) => {
      if (data.eventType === 'read') {
        console.log(`🎯 Usuario leyó: ${title}`);
      }
    },
  });

  // 👇 Type assertion para resolver el conflicto de tipos
  return <div ref={ref as React.RefObject<HTMLDivElement>} className="hidden" />;
}