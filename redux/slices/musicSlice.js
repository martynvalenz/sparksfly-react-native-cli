import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  cover: "",
  artist: "",
  audio: "",
  duration: "",
  trimDuration: "",
  trimLeft: "",
  trimRight: "",
  modal: "",
  audioPlay: "",
};

export const musicSlice = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {
    setSong: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        cover: action.payload.cover,
        artist: action.payload.artist,
        audio: action.payload.audio,
        status: action.payload.status,
        duration: action.payload.duration,
        trimDuration: action.payload.trimDuration,
        trimLeft: action.payload.trimLeft,
        trimRight: action.payload.trimRight,
        modal: action.payload.modal,
        audioPlay: action.payload.audioPlay,
      };
    },
    setSongConfig: (state, action) => {
      return {
        ...state,
        trimLeft: action.payload.trimLeft,
        trimRight: action.payload.trimRight,
      };
    }
  },
  
});

export const { setSong, setSongConfig } = musicSlice.actions;
export default musicSlice.reducer;

