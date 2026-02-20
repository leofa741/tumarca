// hooks/useScrollProgress.ts
'use client';

import { useScroll, MotionValue, UseScrollOptions } from 'framer-motion';
import { useRef, RefObject } from 'react';

/**
 * Hook para obtener el progreso de scroll con tipo genérico
 * @template T - Tipo de elemento HTML (default: HTMLElement)
 */
export const useScrollProgress = <T extends HTMLElement = HTMLElement>(
  options?: Omit<UseScrollOptions, 'container'> & {
    containerRef?: RefObject<T | null>;
  }
) => {
  const internalRef = useRef<T>(null);
  const container = options?.containerRef ?? internalRef;
  
  const { scrollYProgress } = useScroll({
    container,
    ...options,
  });
  
  return { 
    ref: container as RefObject<T>, 
    scrollYProgress 
  };
};

export default useScrollProgress;