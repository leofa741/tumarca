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

interface GiphyTrendingProps {
  apiKey: string;
  limit?: number;
}

const GiphyTrending: React.FC<GiphyTrendingProps> = ({ apiKey, limit = 10 }) => {
  const [gifs, setGifs] = useState<GifImage[]>([]);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&rating=g`
        );
        const data = await res.json();
        setGifs(data.data);
      } catch (err) {
        console.error("Error fetching GIFs:", err);
      }
    };

    fetchGifs();
  }, [apiKey, limit]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {gifs.map((gif) => (
        <img
          key={gif.id}
          src={gif.images.fixed_height.url}
          alt={gif.title}
          style={{
            width: "150px",
            borderRadius: "8px",
            transition: "transform 0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      ))}
    </div>
  );
};

export default GiphyTrending;
