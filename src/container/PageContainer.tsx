import { FileUploader, GifGallery, GifGenerator } from "../components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useState } from "react";

export const PageContainer = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleUpload = async (files: File[]) => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileRef = ref(storage, `images/${file.name}`);
      await uploadBytes(fileRef, file); // Upload file to Firebase Storage
      const downloadURL = await getDownloadURL(fileRef); // public URL
      uploadedUrls.push(downloadURL);
    }

    setImageUrls(uploadedUrls);
  };
  return(
    <div>
      <FileUploader onUpload={handleUpload} />
      <GifGenerator imageUrls={imageUrls} />
      <GifGallery />
    </div>
  )
}