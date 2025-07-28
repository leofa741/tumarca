'use client';

import { PuffLoader } from 'react-spinners';
import { useContext } from 'react';
import { LoadingContext } from '@/context/LoadingContext';


const Loader = () => {
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) return null;

  return (
   <div
  className="fixed inset-0 flex items-center justify-center z-20"
  style={{ backgroundColor: "rgba(17, 24, 39, 0.85)" }} // gray-900 con opacidad 85%
>
      {/* Loader con animación */}
      <PuffLoader

        color="#f59e0b" // Color del loader (puedes cambiarlo)
        size={60} // Tamaño del loader
        speedMultiplier={1} // Velocidad de animación
      />
    </div>
  );
};

export default Loader;
