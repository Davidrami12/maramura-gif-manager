import { useState } from "react";
import FileUploader from "./components/FileUploader";
import GifGenerator from "./components/GifGenerator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

function App() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleUpload = async (files: File[]) => {
    // public URL from images uploaded
    const urls = files.map(file => URL.createObjectURL(file)); // update to Firebase Storage here
    setImageUrls(urls);
  };

  return (
    <div>
      <h1>GIF Generator Manager</h1>
      <FileUploader onUpload={handleUpload} />
      <GifGenerator imageUrls={imageUrls} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App
