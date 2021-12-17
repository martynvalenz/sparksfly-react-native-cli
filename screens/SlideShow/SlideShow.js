import React, {useState} from "react";
import {
  Center,
  Box,
  Avatar,
  Text,
  HStack,
  VStack,
  Spacer,
  Heading,
  IconButton,
  ChevronLeftIcon,
  Input,
} from "native-base";
import { StyleSheet, View, Dimensions, Image, TouchableOpacity,FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const { width,height } = Dimensions.get('window')

const SlideShow = ({ navigation }) => {
  const [photo, setPhoto] = useState(1);

  const data = [
    {
      id: "xBHvZcjRiWyobQ9kxBhO6B2dtRI",
      image: "https://i.pinimg.com/originals/2e/c6/b5/2ec6b5e14fe0cba0cb0aa5d2caeeccc6.jpg",
    },
    {
      id: "z7FCF54Jvzv9Anxyf82QeqFXXOO",
      image: "https://www.ideasdonuts.com/wp-content/uploads/2021/06/Space-and-Galaxy-Phone-Background-12.jpg",
    },
    {
      id: "z7FCF54Jvzv9Anxyf82QeqFXXOL",
      image: "https://www.ideasdonuts.com/wp-content/uploads/2021/06/Cute-and-Pleasing-HD-Phone-Background-18.jpg",
    },
    {
      id: "z7FCF54Jvzv9Anxyf82QeqFXXOG",
      image: "https://wallpaper.dog/large/10729525.jpg",
    },
  ];

  const onViewRef = React.useRef((viewableItems)=> {
    setPhoto(viewableItems.viewableItems[0].index + 1)
  })
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

  return (
    <View style={{ backgroundColor:'#BE9623',height:'100%' }}>
      <LinearGradient
        style={styles.gradientBackground}
        colors={['#D4B041','#876c2d']}
      >
        <Center flex={1} bg="#BE9623">
          <Box w="100%" h="100%" pt={8}>
            <HStack space={2} mt={5} mb={3} alignItems="center">
              <Center w="12" bg="transparent" direction="row">
                <IconButton
                  onPress={() => navigation.navigate("Record")}
                  variant="solid"
                  borderRadius="full"
                  bg="#ffffff"
                  icon={<ChevronLeftIcon name="return" color="#1A1A1C" />}
                  _icon={{ color: "#1A1A1C", size: "sm" }}
                  _hover={{ bg: "#e6e6e6" }}
                  _pressed={{ bg: "#e6e6e6" }}
                  style={{ marginLeft:width * 0.08 }}
                />
              </Center>
              <Center w="300" bg="transparent" direction="row">
                <Heading color="white" bold mb="1" style={{ textAlign:'center' }}>
                  Billboard
                </Heading>
              </Center>
            </HStack>
            <View>
              <Text style={{ color:'white',textAlign:'center',fontSize:15, marginBottom:height * 0.02 }}>Select 2-5 Photos</Text>
            </View>
            <View>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({item,index}) => {
                  return <View style={{ width, justifyContent:'center',alignItems:'center' }}>
                    <View
                      style={{ 
                        margin:12,
                        shadowColor:'#000',
                        shadowOpacity:1,
                        shadowRadius:1,
                        shadowOffset:{
                          width:0,
                          height:0
                        },
                        elevation:1
                      }}
                    >
                      <View style={{ 
                        width:width * 0.8, 
                        overflow:'hidden',
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:18,
                        
                      }}>
                        <Image source={{ uri:item.image }} style={{
                          width:width * 0.8,
                          height:height * 0.6,
                          resizeMode:'cover',
                        }}/>
                      </View>
                    </View>
                  </View>
                }}
              />
              <View style={{ paddingTop:height * 0.03 }}>
                <Text style={{ color:'white',textAlign:'center',fontSize:18,fontWeight:'700' }}>{photo} / {data.length}</Text>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.bottomButton}>
                  <Text style={styles.buttonText}>Select Photos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Box>
        </Center>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor:'transparent',
    width:width
  },

  gradientBackground: {
    height,
    width,
    position:'absolute'
  },

  cardView:{
    flex:1,
    width:width * 0.8,
    height:height / 3,
    backgroundColor:'white',
    margin:10,
    borderRadius:10,
    shadowColor:'#000',
    shadowOffset:{width:0.5,height:0.5},
    shadowOpacity:0.5,
    shadowRadius:3,
    elevation:5
  },

  scrollViewContainerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600
  },

  image:{
    width:width * 0.8,
    height: height * 0.6,
    borderRadius:10,
  },

  bottomContainer: {
    position: 'absolute',
    flex:1,
    bottom:0,
    backgroundColor:'transparent',
    width:width,
    height:height * 0.15
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

export default SlideShow;
