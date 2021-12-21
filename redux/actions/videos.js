import firebase from 'firebase';
import { saveMediaToStorage } from './uploads';
require('firebase/firebase-storage');
import uuid from 'uuid-random';
import {GET_VIDEOS} from '../constants'

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

export const getPostsByUser = (/* uid = firebase.auth().currentUser.uid */)  => dispatch => new Promise((resolve,reject) => {
  firebase.firestore().collection('videos').orderBy('creation','desc')
  .onSnapshot(snap => {
    let videos = snap.docs().map(doc => {
      const data = doc.data()
      const id = doc.id
      return {id,...data}
    })
    dispatch({type:GET_VIDEOS})
  })
})