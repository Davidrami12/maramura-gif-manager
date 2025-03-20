import { useState } from "react";
import { GifGeneratorProps } from "../types/types";
import { createGif, getAllGifs } from "../services/api";
import { toast } from "react-toastify";

export const GifGenerator = ({ imageUrls, setGifs }: GifGeneratorProps) => {
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateGifHandler = async () => {
    try {
      setLoading(true);
      console.log("imageUrls", imageUrls);
      const response = await createGif(imageUrls);
      setGifUrl(response.gifUrl);
      toast.success("GIF generated successfully!");

      // Update the gallery automatically after generating a new GIF
      const updatedGifs = await getAllGifs();
      setGifs(updatedGifs);

    } catch (error) {
      toast.error("Error generating GIF file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generateGifHandler} disabled={loading || imageUrls.length === 0} style={{ margin: "12px" }}>
        {loading ? "Generating GIF..." : "Generate GIF"}
      </button>
      <div>
        {gifUrl && <img src={gifUrl} alt="GIF" width={200} />}
      </div>
    </div>
  );
}
