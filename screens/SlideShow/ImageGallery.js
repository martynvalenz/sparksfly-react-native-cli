// https://www.npmjs.com/package/expo-images-picker
// https://github.com/prscX/react-native-photo-editor
// https://github.com/iyegoroff/react-native-image-filter-kit
// https://reactnativeexample.com/image-editor-build-using-react-native-for-ios-and-android/
import React, { useMemo, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert, Platform } from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
//import StatusBar from '../../components/StatusBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MediaType } from 'expo-media-library';
import { useDispatch } from "react-redux";
import { addImages } from "../../redux/slices/gallerySlice";

const ForceInset = {
  top: 'never',
  bottom: 'never',
};

// IOS users , make sure u can use the images uri to upload , if your getting invalid file path or u cant work with asset-library:// 
// Use = > getImageMetaData: true which will be little slower but give u also the absolute path of the Asset. just console loge the result to see the localUri

// See => https://docs.expo.dev/versions/latest/sdk/media-library/#assetinfo

const ImageGallery = ({ navigation }) => {
  useEffect(() => {
    (async () => {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== 'granted'){
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    })();
  }, []);

  
  // const dispatch = useDispatch();
  // const image = useSelector((state) => state.gallery);

  const onSuccess = async (data) => {
    Alert.alert('Done',`${data.length} Images selected`)
    navigation.navigate('SelectPhotos',{data})
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: 'black',
      errorMessages: {
        hasErrorWithPermissions: 'Please Allow media gallery permissions.',
        hasErrorWithLoading: 'There was an error while loading images.',
        hasErrorWithResizing: 'There was an error while loading images.',
        hasNoAssets: 'No images found.',
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 20,
      assetsType: [MediaType.photo],
      minSelection: 2,
      maxSelection: 10,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: 'jpeg',
    }),
    []
  );

  const _textStyle = {
    color: 'white',
  };

  const _buttonStyle = {
    backgroundColor: 'orange',
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: 'Select',
        back: 'Back',
        selected: '/ 10 selected',
      },
      midTextColor: 'black',
      minSelection: 2,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => navigation.navigate("Record"),
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: 'white',
      spinnerColor: '#FFCB37',
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: 'tomato',
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: '#AA7E1070',
        size: 26,
      },
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        
        <View style={styles.container}>
          <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
            Resize={widgetResize} 
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default  ImageGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
