import React from "react";
import {
  ScrollView,
  Center,
  FlatList,
  Box,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Heading,
  IconButton,
  Input,
} from "native-base";
import { ChevronRightIcon, ChevronLeftIcon, SearchIcon } from "native-base";
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-ico-material-design';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SelectPhotos = (props) => {
  const navigation = useNavigation();
  const data = props.route.params.data
  console.clear()

  const styles = StyleSheet.create({
    header: {
      fontSize:18,
      fontWeight:'600'
    },
    
    bottomContainer: {
      position: 'absolute',
      flex:1,
      bottom:0,
      backgroundColor:'transparent',
      width:width,
      height:height * 0.15
    },

    gradientBackground: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height:height * 0.15,
    },

    buttonContainer:{
      width:width, 
      height: height * 0.05, 
      justifyContent: 'center', 
      alignItems: 'center',
      flex:1,
      bottom:0,
    },
    bottomButton:{
      position: 'absolute',
      width:width * 0.7, 
      height: height * 0.05, 
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius:25,
      backgroundColor:'#FFCB37'
    },
    buttonText:{
      fontSize:20,
      fontWeight:'600'
    }
  });

  return (
    <Center flex={1} px="3" bg="#FFFFFF">
      <Box w="100%" h="100%" pt={8} pl={2}>
        <HStack space={2} mt={3} mb={3} alignItems="center">
          <Center w="10" bg="transparent" direction="row">
            <IconButton
              onPress={() => navigation.navigate("ImageGallery")}
              variant="solid"
              borderRadius="full"
              bg="#FFCB37"
              icon={<ChevronLeftIcon name="return" color="#1A1A1C" />}
              _icon={{ color: "#1A1A1C", size: "sm" }}
              _hover={{ bg: "#FFCB37" }}
              _pressed={{ bg: "#FFCB37" }}
            />
          </Center>
          <Center w="300" bg="transparent" direction="row">
            <Text style={styles.header}>Select photos</Text>
          </Center>
        </HStack>
        <FlatList
          data={data}
          horizontal={false}
          numColumns={3}
          style={{ flex:1 }}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ alignItems:'center' }}>
              <TouchableOpacity>
                <Image 
                  source={{uri: item.uri}} 
                  style={{ 
                    width:width * 0.28,
                    height:width * 0.28, 
                    margin:5, 
                    borderRadius:12 
                  }}
                >
                </Image>
              </TouchableOpacity>
            </View>
          )}
        />
      </Box>
      <View style={styles.bottomContainer}>
        <LinearGradient
          style={styles.gradientBackground}
          colors={['transparent','rgba(255, 255, 255, 0.5)','#fff']}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bottomButton}>
              <Text style={styles.buttonText}>Create Video</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Center>
  );
};

export default SelectPhotos;
