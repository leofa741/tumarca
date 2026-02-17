// hooks/useSectionTracker.ts
'use client';

import { useEffect, useRef, useState } from 'react';


interface TrackOptions {
    sectionId: string;
    sectionName: string;
    minReadTime?: number; // ms para considerar "lectura" (default: 3000)
    onEngagement?: (data: EngagementData) => void;
}

export interface EngagementData {
    sectionId: string;
    sectionName: string;
    eventType: 'view' | 'read' | 'hover' | 'touch';
    dwellTime: number;
    timestamp: string;
}

export const useSectionTracker = ({
    sectionId,
    sectionName,
    minReadTime = 3000,
    onEngagement,
}: TrackOptions) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dwellTime, setDwellTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const hasTrackedRead = useRef(false);
    const entryTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.isIntersecting) {
                    // Sección entró al viewport
                    setIsVisible(true);
                    entryTimeRef.current = Date.now();
                    hasTrackedRead.current = false;

                    // Track "view" inicial (opcional, para no perder el dato)
                    trackEvent('view', 0);

                    // Iniciar timer para medir tiempo de lectura
                    timerRef.current = setInterval(() => {
                        setDwellTime((prev) => prev + 1000);
                    }, 1000);
                } else {
                    // Sección salió del viewport
                    setIsVisible(false);
                    if (timerRef.current) clearInterval(timerRef.current);

                    const totalTime = entryTimeRef.current
                        ? Date.now() - entryTimeRef.current
                        : dwellTime;

                    // Si pasó el tiempo mínimo, trackear como "lectura"
                    if (totalTime >= minReadTime && !hasTrackedRead.current) {
                        trackEvent('read', totalTime);
                        hasTrackedRead.current = true;
                    }

                    setDwellTime(0);
                }
            },
            { threshold: 0.5 } // 50% de la sección visible para activar
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [minReadTime]);

    // Track hover (desktop) y touch (mobile)
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseEnter = () => trackEvent('hover', dwellTime);
        const handleTouchStart = () => trackEvent('touch', dwellTime);

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('touchstart', handleTouchStart, { passive: true });

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('touchstart', handleTouchStart);
        };
    }, [dwellTime]);

    const trackEvent = async (eventType: EngagementData['eventType'], time: number) => {
        const data: EngagementData = {
            sectionId,
            sectionName,
            eventType,
            dwellTime: time,
            timestamp: new Date().toISOString(),
        };

        // Callback para manejo personalizado
        onEngagement?.(data);

        // Enviar a API (con debounce opcional para no saturar)
        try {
            await fetch('/api/track-engagement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                keepalive: true, // Importante para que se envíe al navegar
            });
            console.log(`✅ Trackeado: ${sectionName} - ${eventType} (${time}ms)`);
        } catch (error) {
            console.error('Error trackeando engagement:', error);
        }
    };

    return { ref, isVisible, dwellTime };
};