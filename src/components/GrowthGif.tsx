'use client';
import { useEffect, useState } from "react";

interface GifImage {
    id: string;
    title: string;
    images: {
        fixed_height: {
            url: string;
        };
    };
}

interface GrowthGifProps {
    apiKey: string;
    query?: string; // palabra clave, por defecto 'growth chart'
    width?: number;
    height?: number;
    opacity?: number;
}

const GrowthGif: React.FC<GrowthGifProps> = ({
    apiKey,
    query = "growth chart",
    width = 150,
    height = 150,
    opacity = 0.7,
}) => {
    const [gif, setGif] = useState<GifImage | null>(null);

    useEffect(() => {
        const fetchGif = async () => {
            try {
                const res = await fetch(
                    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
                        query
                    )}&limit=1&rating=g`
                );
                const data = await res.json();
                setGif(data.data[0]);
            } catch (err) {
                console.error("Error fetching GIF:", err);
            }
        };
        fetchGif();
    }, [apiKey, query]);

    if (!gif) return null;

    return (
        <img
            src={gif.images.fixed_height.url}
            alt={gif.title}
            style={{
                width: `${width}px`,
                height: `${height}px`, // Asegura proporción 1:1
                borderRadius: "50%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                
                opacity: opacity,
                marginTop: "10px",
                transition: "transform 0.3s",
                cursor: "pointer",
                objectFit: "cover",   // Asegura que la imagen se recorte bien dentro del círculo
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
    );
};

export default GrowthGif;
