import { GifGalleryProps } from "../types/types";

export const GifGallery = ({ gifs }: GifGalleryProps) => {
  return (
    <div>
      <h2><i>🎞️ GIFs Gallery</i></h2>
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
