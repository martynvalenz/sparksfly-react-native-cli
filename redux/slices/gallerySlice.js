import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: initialState,
  reducers: {
    addImages: (state, action) => {
      state.push(action.payload);
      return {
        ...state,
        // name: action.payload.name,
        item: action.payload,
      };
    }
  },
  
});

export const { addImages } = gallerySlice.actions;
export default gallerySlice.reducer;

