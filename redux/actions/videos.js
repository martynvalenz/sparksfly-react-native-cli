import firebase from 'firebase';
import { saveMediaToStorage } from './uploads';
require('firebase/firebase-storage');
import uuid from 'uuid-random';

export const saveVideo = (video)  => dispatch => new Promise((resolve,reject) => {
  saveMediaToStorage(video,`videos/${uuid()}`)
  .then(downloadUrl => {
    firebase.firestore().collection('videos').add({
      downloadUrl,
      creation:firebase.firestore.FieldValue.serverTimestamp()
    })
  })
  .then(() => resolve())
  .catch(error => {
    console.log('error: ',error)
    reject()
  })
})