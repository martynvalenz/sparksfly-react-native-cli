import React from 'react';
import { StatusBar, View, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

const StatusBarPlaceHolder = () => {
  return (
    <View
      style={{
        width: '100%',
        height: height * 0.01,
      }}>
      <StatusBar barStyle={'dark-content'} />
    </View>
  );
}

export default StatusBarPlaceHolder;