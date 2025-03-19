import { useState } from "react";
import { GifGeneratorProps } from "../types/types";
import { createGif } from "../services/api";
import { toast } from "react-toastify";

export const GifGenerator = ({ imageUrls }: GifGeneratorProps) => {
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateGifHandler = async () => {
    try {
      setLoading(true);
      console.log("imageUrls", imageUrls)
      const response = await createGif(imageUrls);
      setGifUrl(response.gifUrl);
      toast.success("GIF generated successfully!");
    } catch (error) {
      toast.error("Error generating GIF file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={generateGifHandler} disabled={loading || imageUrls.length === 0}>
          {loading ? "Generating GIF..." : "Generate GIF"}
        </button>
      </div>
      <div>
        {gifUrl && <img src={gifUrl} alt="GIF" width={200} />}
      </div>
    </div>
  );
}
