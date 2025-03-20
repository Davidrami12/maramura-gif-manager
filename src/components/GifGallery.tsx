import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGifThunk, fetchGifs } from "../store/thunks/gifsThunks";
import { AppDispatch } from "../store/store";
import { GifGalleryProps } from "../types/types";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import CircularProgress from "@mui/material/CircularProgress";
import CollectionsTwoToneIcon from '@mui/icons-material/CollectionsTwoTone';
import { toast } from "react-toastify";

export const GifGallery = ({ gifs }: GifGalleryProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await dispatch(deleteGifThunk(id))
      await dispatch(fetchGifs())
      toast.success("GIF deleted successfully!")
    } catch (error) {
      toast.error("Error deleting GIF")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <h2><i><CollectionsTwoToneIcon fontSize="inherit" color="primary"/> GIFs Gallery </i></h2>
      {gifs.length === 0 ? <p>No GIFs available.</p> : null}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {gifs.map(({ id, gif }) =>
          gif?.src ? (
            <div key={id} style={{ textAlign: "center" }}>
              <img src={gif.src} alt={gif.title} width={200} height={200}/>
              <p>{gif.title}</p>
              
              <button
                onClick={() => handleDelete(id)}
                disabled={deletingId === id}
                style={{background: deletingId === id ? "gray" : "red"}}
              >
                {deletingId === id ? (
                  <>
                    <CircularProgress size={14} color="inherit" /> Deleting...
                  </>
                ) : (
                  <>
                    <DeleteOutlineTwoToneIcon fontSize="small" /> Delete
                  </>
                )}
              </button>

            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
