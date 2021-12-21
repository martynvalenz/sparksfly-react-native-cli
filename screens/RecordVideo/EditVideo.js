import React, {useEffect} from 'react';
import { StyleSheet, Button, View, Image, Text } from 'react-native';
import {useDispatch} from 'react-redux';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { getPostsByUser } from '../../redux/actions/videos';

export default EditVideo = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPostsByUser())
  }, []);

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        source,
        {
          time: 1000,
        }
      );
      return uri
    } catch (e) {
      console.warn(e);
    }
  };
  
  return (
    <View>

    </View>
  )
}
