import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGifThunk } from "../store/thunks/gifsThunks";
import { toast } from "react-toastify";
import { AppDispatch } from "../store/store";
import { GifGeneratorProps } from "../types/types";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import CircularProgress from "@mui/material/CircularProgress";

export const GifGenerator = ({ imageUrls }: GifGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>()

  const generateGifHandler = async () => {
    try {
      setLoading(true);
      await dispatch(createGifThunk(imageUrls));
      toast.success("GIF generated successfully!");
    } catch (error) {
      console.error("Error: ", error)
      toast.error("Error generating GIF file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={generateGifHandler} disabled={loading || imageUrls.length === 0} style={{ margin: "12px" }}>
          {loading ? (
            <>
              <CircularProgress size={14} color="inherit" /> Generating GIF...
            </>
          ) : (
            <>
              <AddCircleOutlineTwoToneIcon fontSize="small" /> Generate GIF
            </>
          )}
        </button>
      </div>
    </div>
  );
}
