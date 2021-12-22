import React from 'react'
import MImagePicker from 'react-native-image-video-picker-editor'
import { HandleCrop } from 'react-native-image-video-picker-editor/cropper'
import {View} from 'react-native'

export default VideoPicker = ({navigation}) => {
  return (
    <View>
      <MImagePicker
        header={{ nextTitle: "Next", cancelTitle: "Cancel" }}
        onCancel={() => navigation.goBack()}
        onNext={async (param) => {
          param.videoMaxLen = 3; // not set or 0 for unlimited
          param.videoQuality = 'low';
          const res = await HandleCrop(param);
          this.setState({ result: res, showResult: true })
        }}
        cropSize={{ width: 200, height: 200 }}
        maxScale={10}  
        max={4}
        cameraConfig = {{ camerPhotoTile: "Photo", cameraVideoTitle: "Video", cameraCancelTitle: "Cancle", maxVideoLen: 0, videoQuality: "480p" }}
      // profile={true}

      />
    </View>
  )
}
