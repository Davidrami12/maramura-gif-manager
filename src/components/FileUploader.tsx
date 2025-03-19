import { ChangeEvent, useState } from "react";
import { validateFiles } from "../utils/validations";
import { FileUploaderProps } from "../types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FileUploader = ({ onUpload }: FileUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const { validFiles, error } = validateFiles(files);

    if (error) {
      toast.error(error);
    }

    if (validFiles.length > 0) {
      setPreviews(validFiles.map(file => URL.createObjectURL(file)));
      onUpload(files)
      toast.success("Files updated correctly!");
    }
  };

  return (
    <div>
      <input type="file" multiple accept="image/png, image/jpeg, image/gif" onChange={handleFileChange} />
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {previews.map((src, index) => (
          <img key={index} src={src} alt={`preview-${index}`} width={200} />
        ))}
      </div>
    </div>
  );
}
