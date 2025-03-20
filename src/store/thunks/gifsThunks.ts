import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllGifs, createGif, deleteGif } from "../../services/api";

export const fetchGifs = createAsyncThunk("gifs/fetchGifs", async () => {
  const gifs = await getAllGifs();
  return gifs;
});

export const createGifThunk = createAsyncThunk("gifs/createGif", async (imageUrls: string[], { dispatch }) => {
  const response = await createGif(imageUrls);
  dispatch(fetchGifs()); // Update GIF list after creating a GIF
  return response;
});

export const deleteGifThunk = createAsyncThunk("gifs/deleteGif", async (id: string, { dispatch }) => {
  await deleteGif(id);
  dispatch(fetchGifs()); // Update GIF list after deleting a GIF
  return id;
});