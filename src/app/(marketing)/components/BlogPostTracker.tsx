// app/(marketing)/components/BlogPostTracker.tsx
'use client';

import { useEffect } from 'react';
import { useSectionTracker } from './useSectionTracker';

interface BlogPostTrackerProps {
  slug: string;
  title: string;
  children: React.ReactNode;
}

export default function BlogPostTracker({ slug, title, children }: BlogPostTrackerProps) {
  const { ref: contentRef } = useSectionTracker({
    sectionId: `blog-${slug}`,
    sectionName: `blog-post: ${title}`,
    minReadTime: 5000, // 5 segundos para considerar "lectura"
    onEngagement: (data) => {
      if (data.eventType === 'read') {
        console.log(`🎯 Usuario leyó el artículo: ${slug}`);
        // Acá podés enviar el evento a tu backend, GA4, Pixel, etc.
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(data) })
      }
    },
  });

  // Opcional: trackear cuando el usuario llega al final del artículo
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log(`✅ Usuario completó la lectura: ${slug}`);
          // dispatch event o llamada a API
        }
      },
      { threshold: 0.8 } // 80% del artículo visible
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, [contentRef, slug]);

  return <div  ref={contentRef as React.RefObject<HTMLDivElement>}>{children}</div>;


  
}