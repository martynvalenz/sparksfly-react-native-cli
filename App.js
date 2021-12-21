// import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, NavigateBaseProvider } from "native-base";
import firebase from 'firebase/app';
import Constants from 'expo-constants';
//react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//components
import Record from "./screens/Record";
import MusicLibrary from "./screens/MusicLibrary/MusicLibrary";
import SlideShow from "./screens/SlideShow/SlideShow";
import SelectPhotos from "./screens/SlideShow/SelectPhotos";
import ImageGallery from "./screens/SlideShow/ImageGallery";
import RecordScreen from "./screens/RecordVideo/RecordScreen";
import SaveVideo from "./screens/RecordVideo/SaveVideo";
import EditVideo from "./screens/RecordVideo/EditVideo";
  //redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

if(firebase.apps.length === 0){
  firebase.initializeApp(Constants.manifest.web.config.firebase);
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Record" component={Record} options={{headerShown:false}}/>
      <Stack.Screen name="MusicLibrary" component={MusicLibrary} options={{headerShown:false}}/>
      <Stack.Screen name="SelectPhotos" component={SelectPhotos} options={{headerShown:false}}/>
      <Stack.Screen name="ImageGallery" component={ImageGallery} options={{headerShown:false}}/>
      <Stack.Screen name="SlideShow" component={SlideShow} options={{headerShown:false}}/>
      <Stack.Screen name="RecordScreen" component={RecordScreen} options={{headerShown:false}}/>
      <Stack.Screen name="SaveVideo" component={SaveVideo} options={{headerShown:false}}/>
      <Stack.Screen name="EditVideo" component={EditVideo} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer style={styles.container}>
          <MyStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
