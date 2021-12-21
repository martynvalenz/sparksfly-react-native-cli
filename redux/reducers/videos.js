import {GET_VIDEOS} from '../constants'

const initialState = {
  uploadedVideos: null
}

export const videos = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        uploadedVideos:action.uploadedVideos,
      }
  
    default:
      break;
  }
}