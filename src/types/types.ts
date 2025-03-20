export type Gif = {
  id: string;
  gif: {
    src: string;
    title: string;
  };
}

export type GifsState = {
  gifs: Gif[];
  imageUrls: string[],
  loading: boolean;
  error: string | null;
}

export type GifGalleryProps = {
  gifs: Gif[];
}

export type FileUploaderProps = {
  onUpload: (files: File[]) => void;
}

export type GifGeneratorProps = {
  imageUrls: string[];
  setGifs?: (gifs: Gif[]) => void;
}