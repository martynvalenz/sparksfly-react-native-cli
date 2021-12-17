import React, {useState} from 'react'
import { View, TextInput, StyleSheet,Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import { saveVideo } from '../../redux/actions/videos';

const SaveVideo = (props) => {
  const navigation = useNavigation();
  const [requestRunning, setRequestRunning] = useState(false);

  const dispatch = useDispatch()

  const handleSaveVideo = () => {
    setRequestRunning(true)
    dispatch(saveVideo(props.route.params.source))
    .then(() => {
      setRequestRunning(false)
      navigation.dispatch(StackActions.popToTop());
    })
    .catch(error => {
      setRequestRunning(false)
      console.log(error)
    })
  }

  if(requestRunning){
    return(
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="#FFCB37" size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image style={styles.mediaPreview} source={{ uri:props.route.params.source }} />
      </View>
      <View style={styles.spacer}/>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Feather name="x" size={24} color="#ff4040"/>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleSaveVideo()}
          style={styles.postButton}
        >
          <Feather name="corner-left-up" size={24} color="black"/>
          <Text style={styles.postText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  uploadingContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },  
  container: {
    flex: 1,
    paddingTop:30,
    backgroundColor:'white'
  },
  formContainer:{
    margin:20,
    borderRadius:12,
    flexDirection:'row',
    flex:1
  },
  mediaPreview:{
    borderRadius:12,
    aspectRatio:9/16,
    backgroundColor:'black',
    width:'100%'
  },
  spacer:{flex:1},
  buttonsContainer:{
    flexDirection:'row',
    margin:10,
  },
  cancelButton:{
    alignItems:'center',
    flex:1,
    borderColor:'#ff4040',
    borderWidth:1,
    flexDirection:'row',
    paddingVertical:10,
    paddingHorizontal:20,
    justifyContent:'center',
    borderRadius:4,
    margin:10
  },
  cancelText:{
    marginLeft:5,
    fontWeight:'bold',
    color:'#ff4040',
    fontSize:16
  },
  postButton:{
    alignItems:'center',
    flex:1,
    backgroundColor:'#FFCB37',
    flexDirection:'row',
    paddingVertical:10,
    paddingHorizontal:20,
    justifyContent:'center',
    borderRadius:4,
    margin:10
  },
  postText:{
    marginLeft:5,
    fontWeight:'bold',
    color:'black',
    fontSize:16
  },
});

export default SaveVideo;