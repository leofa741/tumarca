// components/ui/ScrollProgressBar.tsx
'use client';

import { motion, useScroll } from 'framer-motion';
import { memo } from 'react';

export interface ScrollProgressBarProps {
  /** Altura de la barra en píxeles (default: 4) */
  height?: number;
  
  /** Posición: 'top' o 'bottom' (default: 'top') */
  position?: 'top' | 'bottom';
  
  /** Color sólido (opcional, prioriza sobre gradient) */
  color?: string;
  
  /** Gradiente personalizado (default: blue→indigo→purple) */
  gradient?: string;
  
  /** Opacidad (default: 1) */
  opacity?: number;
  
  /** Z-index (default: 100) */
  zIndex?: number;
  
  /** Clase CSS adicional */
  className?: string;
}

const ScrollProgressBar = memo(({
  height = 4,
  position = 'top',
  color,
  gradient = 'from-blue-600 via-indigo-600 to-purple-600',
  opacity = 1,
  zIndex = 100,
  className = ''
}: ScrollProgressBarProps) => {
  // ✅ DESTRUCTURAR: useScroll devuelve un objeto con múltiples propiedades
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`fixed left-0 right-0 ${position === 'top' ? 'top-0' : 'bottom-0'} ${className}`}
      style={{ 
        height, 
        opacity,
        scaleX: scrollYProgress, // ✅ Ahora es un MotionValue<number> válido
        transformOrigin: 'left',
        zIndex 
      }}
    >
      <div 
        className={`w-full h-full ${color ? '' : `bg-gradient-to-r ${gradient}`}`}
        style={color ? { backgroundColor: color } : {}}
      />
    </motion.div>
  );
});

ScrollProgressBar.displayName = 'ScrollProgressBar';

export default ScrollProgressBar;