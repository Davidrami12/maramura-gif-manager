import { createSlice } from "@reduxjs/toolkit";
import { GifsState } from "../../types/types";
import { createGifThunk, deleteGifThunk, fetchGifs } from "../thunks/gifsThunks";

const initialState: GifsState = {
  gifs: [],
  imageUrls: [],
  loading: false,
  error: null,
};

const gifsSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load GIFs from Firestore
      .addCase(fetchGifs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        state.loading = false;
        state.gifs = action.payload;
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading GIFs";
      })

      // Create a new GIF
      .addCase(createGifThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGifThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.gifs.push(action.payload);
      })
      .addCase(createGifThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error creating GIF";
      })

      // Delete an existing GIF by ID
      .addCase(deleteGifThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGifThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.gifs = state.gifs.filter((gif) => gif.id !== action.payload);
      })
      .addCase(deleteGifThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error deleting GIF";
      });
  },
});

export default gifsSlice.reducer;
