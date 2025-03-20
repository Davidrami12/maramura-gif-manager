import { FileUploader, GifGallery, GifGenerator } from "../components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { getAllGifs } from "../services/api";
import { Gif } from "../types/types";

export const PageContainer = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]); // state to save gifs

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const gifsData = await getAllGifs();
        setGifs(gifsData);
      } catch (error) {
        console.error("Error loading GIFs", error);
      }
    };
    fetchGifs();
  }, []);

  const handleUpload = async (files: File[]) => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileRef = ref(storage, `images/${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      uploadedUrls.push(downloadURL);
    }

    setImageUrls(uploadedUrls);
  };

  return (
    <div>
      <FileUploader onUpload={handleUpload} />
      <GifGenerator imageUrls={imageUrls} setGifs={setGifs} /> {/* 📌 Pasamos setGifs */}
      <GifGallery gifs={gifs} /> {/* 📌 Pasamos gifs */}
    </div>
  )
}