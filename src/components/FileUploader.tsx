import { ChangeEvent, useState } from "react";
import { validateFiles } from "../utils/validations";
import { FileUploaderProps } from "../types/types";
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
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
      onUpload(validFiles);
      toast.success("Files updated correctly!");
    }
  };

  return (
    <div>
      <h2><i><AutoAwesomeTwoToneIcon color="warning"/> Create GIF </i></h2>
      <p>Select and upload multiple image files to generate your own GIF:</p>
      <input type="file" multiple accept="image/png, image/jpeg, image/gif" onChange={handleFileChange} />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {previews.map((src, index) => (
          <img key={index} src={src} alt={`preview-${index}`} width={200} height={200}/>
        ))}
      </div>
    </div>
  );
}
