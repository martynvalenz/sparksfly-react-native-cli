import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';

export default RecordScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [maxDuration, setMaxDuration] = useState(15);
  const [galleryItems, setGalleryItems] = useState([]);
  const [cameraRef, setCameraRef] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)
  const [isCameraReady, setIsCameraReady] = useState(false)

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      
      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted');

      if(galleryStatus.status == 'granted'){
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy:['creationTime'], mediaType:['video']});
        setGalleryItems(userGalleryMedia.assets);
      }
    })(); 
  }, []);

  const handleMaxDuration = () => {
    if(maxDuration === 15){
      setMaxDuration(30)
    }
    else{
      setMaxDuration(15)
    }
  }

  const recordVideo = async () => {
    if(cameraRef){
      try {
        const options = {
          maxDuration,
          quality:Camera.Constants.VideoQuality['']
        }
        const videoRecordPromise = cameraRef.recordAsync(options)
        if(videoRecordPromise){
          const data = await videoRecordPromise;
          const source = data.uri;
          navigation.navigate('SaveVideo', {source})
        }
      } catch (error) {
        console.warn(error)
      }
    }
  }

  const stopVideo = async () => {
    if(cameraRef){
      cameraRef.stopRecording();
    }
  }

  const pickFromGallery = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Videos,
      allowsEditing:true,
      aspectRatio:[16,9],
      quality:1
    })
    if(!result.cancelled){
      navigation.navigate('SaveVideo', {source:result.uri})
    }
  }

  if(!hasCameraPermission || !hasAudioPermission || !hasGalleryPermission){
    return(
      <View style={{ flex:1,backgroundColor:'black',alignItems:'center',justifyContent:'center' }}>
        <Text style={{ color:'white', textAlign:'center' }}>User mus give audio, camera and gallery access</Text>
      </View>
    )
  }
  else{
    return (
      <View style={styles.container}>
        {
          isFocused 
          ? <Camera
            style={styles.camera}
            ref={ref => {setCameraRef(ref)}}
            ratio={'16:9'}
            type={cameraType}
            flashMode={cameraFlash}
            onCameraReady={() => setIsCameraReady(true)}
          >
          </Camera>
          : null
        }

        <View style={styles.sideBarContainer}>
          <TouchableOpacity 
            style={{ margin:5 }} 
            onPress={() => setCameraType(cameraType === Camera.Constants.Type.back 
              ? Camera.Constants.Type.front : Camera.Constants.Type.back  
            )}
          >
            <Ionicons style={{ textAlign:'center' }} name={"camera-reverse-outline"} size={30} color="white" />
            <Text style={styles.iconText}>Flip</Text>
          </TouchableOpacity>
          {
            cameraType === Camera.Constants.Type.back
            ? <TouchableOpacity 
              style={{ margin:5 }}
              onPress={() => setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off 
                ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off  
              )}
            >
              <Feather style={{ textAlign:'center' }} name={"zap"} size={30} color="white" />
              <Text style={styles.iconText}>Flash</Text>
            </TouchableOpacity>
            : <></>
          }
          <TouchableOpacity style={{ margin:5 }} onPress={() => handleMaxDuration()}>
            <Ionicons style={{ textAlign:'center' }} name={"timer-outline"} size={30} color="white" />
            <Text style={styles.iconText}>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin:5 }}>
            <Ionicons style={{ textAlign:'center' }} name={"musical-notes-outline"} size={30} color="white" />
            <Text style={styles.iconText}>Music</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBarContainer}>
          <View style={{ flex:1 }}></View>
          <View style={styles.recordButtonContainer}>
            <TouchableOpacity
              disabled={!isCameraReady}
              onLongPress={() => recordVideo()}
              onPressOut={() => stopVideo()}
              style={styles.recordScreenButton}
            >
              <View style={styles.innerRecordScreenButton}></View>
            </TouchableOpacity>
          </View>
          <View style={{ flex:1 }}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() => pickFromGallery()}
            >
              {
                galleryItems[0] == undefined 
                ? <></>
                : <Image style={styles.galleryButtonImage} source={{ uri:galleryItems[0].uri }}/>
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomSelects}>
          <TouchableOpacity style={styles.optionButtons} onPress={() => setMaxDuration(15)}>
            <Text style={{ color:'white' }}>15s</Text>
            {
              maxDuration === 15 
              ? <Text style={{ color:'white', textAlign:'center', fontSize:16, fontWeight:'bold' }}>.</Text>
              : <></>
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButtons} onPress={() => setMaxDuration(30)}>
            <Text style={{ color:'white' }}>30s</Text>
            {
              maxDuration === 30 
              ? <Text style={{ color:'white', textAlign:'center', fontSize:16, fontWeight:'bold' }}>.</Text>
              : <></>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    backgroundColor:'black',
    aspectRatio:9/16,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    // margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  bottomBarContainer:{
    alignItems:'center',
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    marginBottom:20,
    bottom: "4%",
  },
  recordButtonContainer:{
    flex:1,
    marginHorizontal:30
  },
  recordScreenButton:{
    borderWidth: 2,
    borderRadius:50,
    borderColor: 'white',
    height: 75,
    width:75,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:30
  },
  innerRecordScreenButton:{
    borderWidth: 2,
    borderRadius:50,
    borderColor: '#FFCB37',
    height: 65,
    width:65,
    backgroundColor: '#FFCB37'
  }, 
  galleryButton:{
    borderWidth:2,
    borderColor:'white',
    borderRadius:10,
    overflow:'hidden',
    width:50,
    height:50
  },
  galleryButtonImage:{
    width:50,
    height:50
  },
  sideBarContainer:{
    top:80,
    right:0,
    marginHorizontal:20,
    position:'absolute'
  },
  iconText:{
    fontSize: 14,
    marginBottom: 10,
    color: 'white', 
    textAlign:'center'
  },
  bottomSelects: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop:15,
    position: "absolute",
    alignContent: "center",
    bottom: "2%",
  },
  optionButtons:{
    padding:10,
  }
}); 