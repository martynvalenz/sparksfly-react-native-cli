import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./slices/musicSlice";
import gallerySlice from "./slices/gallerySlice";

export const store = configureStore({
  reducer: {
    music: musicSlice,
    gallery:gallerySlice
  },
});
