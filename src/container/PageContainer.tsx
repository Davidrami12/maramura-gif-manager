import { FileUploader, GifGallery, GifGenerator } from "../components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchGifs } from "../store/thunks/gifsThunks";
import { useEffect, useState } from "react";

export const PageContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gifs = useSelector((state: RootState) => state.gifs.gifs);
  const [imageUrls, setImageUrls] = useState<string[]>([])

  useEffect(() => {
    dispatch(fetchGifs())
  }, [dispatch])

  const handleUpload = async (files: File[]) => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileRef = ref(storage, `images/${file.name}`)
      await uploadBytes(fileRef, file)
      const downloadURL = await getDownloadURL(fileRef)
      uploadedUrls.push(downloadURL)
    }

    setImageUrls(uploadedUrls);
  };

  return (
    <div>
      <h1><u>🖼️ GIF Generator Manager 🛠️</u></h1>
      <FileUploader onUpload={handleUpload} />
      <GifGenerator imageUrls={imageUrls} />
      <GifGallery gifs={gifs} />
    </div>
  )
}