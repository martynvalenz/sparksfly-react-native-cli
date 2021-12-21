import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { IconButton, ChevronLeftIcon } from "native-base";
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import Svg, { Path, G } from "react-native-svg";
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';

const Record = () => {
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
      <View style={{ flex:1,backgroundColor:'#373f68',alignItems:'center',justifyContent:'center' }}>
        <Text style={{ color:'white', textAlign:'center' }}>User mus give audio, camera and gallery access</Text>
      </View>
    )
  }

  return (
    <>
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
        <View style={styles.backContainer}>
          <IconButton
            onPress={() => navigation.navigate("Record")}
            variant="solid"
            borderRadius="full"
            bg="#FFCB37"
            icon={<ChevronLeftIcon name="return" color="#1A1A1C" />}
            _icon={{ color: "#1A1A1C", size: "sm" }}
            _hover={{ bg: "#FFCB37" }}
            _pressed={{ bg: "#FFCB37" }}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonRecord} onPress={() => setCameraType(cameraType === Camera.Constants.Type.back 
              ? Camera.Constants.Type.front : Camera.Constants.Type.back  
            )}>
            <Ionicons name="camera-reverse-outline" size={38} color="white" />
            <Text style={styles.textRecord}>Flip</Text>
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
          <TouchableOpacity style={styles.buttonRecord} onPress={() => handleMaxDuration()}>
            <Ionicons name="timer-outline" size={38} color="white" />
            <Text style={styles.textRecord}>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRecord}
            onPress={() => navigation.navigate("MusicLibrary")}
          >
            <Ionicons name="ios-musical-notes-outline" size={38} color="white" />
            <Text style={styles.textRecord}>Music</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.buttonRecord} onPress={() => navigation.navigate("SlideShow")}>
            <Ionicons name="color-filter" size={38} color="white" />
            <Text style={styles.textRecord}>Effect</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
          >
            <View style={styles.recordScreenButton}>
              <View style={styles.innerRecordScreenButton}>
              </View>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.buttonRecord} onPress={() => pickFromGallery()}>
            <FontAwesome name="image" size={37} color="white" />
            <Text style={styles.textRecord}>Upload</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.buttonRecord} onPress={() => navigation.navigate('ImageGallery')}>
            <FontAwesome name="image" size={37} color="white" />
            <Text style={styles.textRecord}>Upload</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.optionButtons} onPress={() => navigation.navigate('SlideShow')}>
            <Text style={{ color:'white' }}>Photo Templates</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#373f68",
    alignItems: "center",
    justifyContent: "center",
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
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  buttonRecord: {
    marginBottom: 20,
    alignItems: "center",
    alignContent: "center",
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  textRecord: {
    color: "white",
  },
  backContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    bottom: "8%",
  },
  recordScreenButton:{
    borderWidth: 2,
    borderRadius:50,
    borderColor: 'white',
    height: 75,
    width:75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerRecordScreenButton:{
    borderWidth: 2,
    borderRadius:50,
    borderColor: '#FFCB37',
    height: 65,
    width:65,
    backgroundColor: '#FFCB37'
  },  
  bottomSelects: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop:15,
    paddingLeft:50,
    position: "absolute",
    alignContent: "center",
    bottom: "5%",
  },
  optionButtons:{
    padding:15,
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

export default Record;
