import * as React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useNavigation, StackActions } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

export default ViewVideo = (props) =>  {
  const video = React.useRef(null);
  const navigation = useNavigation();
  const [status, setStatus] = React.useState({});
  const source = props.route.params.source;

  const handleSaveVideo = async() => {
    await MediaLibrary.createAssetAsync(source);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Video
            ref={video}
            style={styles.mediaPreview}
            source={{
              uri: (source),
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
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
          // onPress={() => VESDK.openEditor(props.route.params.source)}
          style={styles.postButton}
        >
          <Feather name="save" size={24} color="black"/>
          <Text style={styles.postText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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