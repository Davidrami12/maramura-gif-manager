import { useEffect, useState } from "react";
import { getAllGifs } from "../services/api";
import { toast } from "react-toastify";

export const GifGallery = () => {
  const [gifs, setGifs] = useState<{ id: string; gif: { src: string; title: string } }[]>([]);
  
  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const gifsData = await getAllGifs();
        setGifs(gifsData);
      } catch (error) {
        toast.error("Error cargando los GIFs");
      }
    };
    fetchGifs();
  }, []);

  return (
    <div>
      <h2>🎞️ GIFs Generados</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {gifs.map(({ id, gif }) => (
          <div key={id} style={{ textAlign: "center" }}>
            <img src={gif.src} alt={gif.title} width={200} />
            <p>{gif.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
