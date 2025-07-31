// src/components/ValorDestacado.tsx
import Image from 'next/image';

interface ValorDestacadoProps {
  titulo: string;
  descripcion: string;
  imagenSrc: string;
  alt: string;
  delay?: number;
}

export default function ValorDestacado({
  titulo,
  descripcion,
  imagenSrc,
  alt,
  delay = 0.3,
}: ValorDestacadoProps) {
  return (
    <div
      className="flex items-start space-x-4 p-4 dark:bg-gray-800 rounded-lg  transition-transform transform hover:scale-105"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Imagen */}
      <div className="md:w-20 md:h-20 w-16 h-16 flex-shrink-0">
        <Image
          src={imagenSrc}
          alt={alt}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>



      {/* Texto */}
        <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-500 dark:text-white">
            {titulo}
            </h3>
            <p className="text-gray-400 dark:text-gray-300 mt-2">
            {descripcion}
            </p>
            <p className="text-gray-300 dark:text-gray-200 mt-2">
              {/* Aquí puedes agregar información adicional o un llamado a la acción */}
            </p>
          </div>
        </div>
            
  );
}