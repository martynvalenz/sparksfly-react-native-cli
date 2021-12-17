import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSong } from "../../redux/slices/musicSlice";
import { TextInput, StyleSheet, View } from "react-native";
import {
  Center,
  FlatList,
  Box,
  Avatar,
  Text,
  HStack,
  VStack,
  Spacer,
  Heading,
  IconButton,
  Button,
} from "native-base";
import { ChevronRightIcon, ChevronLeftIcon, SearchIcon } from "native-base";
import MusicModal from "./MusicModal";
import axios from "axios";

const MusicLibrary = ({ navigation }) => {
  const dispatch = useDispatch();

  const [track, setTrack] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState();

  const reggaeton = "9640564402";
  const pop = "2098157264";
  const rock = "1306931615";
  const rap = "6682665064";
  const dance = "2113355604";
  const all = "3155776842";

  const getTracks = (playlist) => {
    axios
      .get("https://api.deezer.com/playlist/" + playlist, { timeout: 1000 })
      .then(function (res) {
        let play = [];
        res.data.tracks.data.map((p) => {
          play.push(p);
        });
        setTrack(play);
      });
  };

  const getGenres = () => {
    axios.get("https://api.deezer.com/genre/").then(function (res) {
      let genre = [];
      res.data.data.map((g) => {
        genre.push(g.name);
      });
      setGenres(genre.slice(0, 6));
    });
  };

  const getSearch = () => {
    axios
      .get("https://api.deezer.com/search?q=track:" + search, { timeout: 1000 })
      .then(function (res) {
        let searchs = [];
        res.data.data.map((s) => {
          searchs.push(s);
        });
        setTrack(searchs);
        console.log("tracks...");
        console.log("estoy es del search", track);
      });
  };

  useEffect(() => {
    getGenres();
    getTracks(all);
  }, []);

  const onClickShowModal = (item) => {
    const stateModal = {
      name: item.title_short,
      cover: item.album.cover,
      artist: item.artist.name,
      audio: item.preview,
      modal: true,
      audioPlay: true,
    };

    dispatch(setSong(stateModal));
  };

  const Time = (duration) => {
    var minutes = Math.floor(duration / 60);
    var seconds = duration - minutes * 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
  };

  const styles = StyleSheet.create({
    searchInput: {
      flex: 1,
      backgroundColor: "#FFF6DC",
      borderColor: "#FFF6DC",
      width: "100%",
      borderWidth: 1,
      borderRadius: 20,
      padding: 7,
      color: "gray",
    },
    searchContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFF6DC",
      borderRadius: 20,
      paddingLeft: 10,
    },
  });

  return (
    <Center flex={1} px="3" bg="#FFFFFF">
      <Box w="100%" h="100%" pt={8} pl={2}>
        <HStack space={2} mt={2} mb={3}>
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
          <View style={styles.searchContent}>
            <SearchIcon color="#9C9C9E" size="5" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              onChangeText={(text) => setSearch(text)}
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() => {
                getSearch();
              }}
            />
          </View>
        </HStack>
        <Text
          semibold
          mb="3"
          fontSize="16"
          _dark={{
            color: "warmGray.50",
          }}
          color="coolGray.800"
          bold
        >
          Music Genre
        </Text>
        <Box
          w="100%"
          p="4"
          marginBottom="4"
          bg="#FFF6DC"
          overflow="hidden"
          rounded="xl"
        >
          <HStack space={3} alignItems="center" flexWrap="wrap">
            {genres.map((genre) => (
              <Button
                key={genre}
                marginRight="2"
                marginBottom="2"
                bg="#FFCB37"
                size="md"
                rounded="full"
                onPress={() => {
                  if (genre == "Reggaeton") getTracks(reggaeton);
                  if (genre == "Pop") getTracks(pop);
                  if (genre == "Rap/Hip Hop") getTracks(rap);
                  if (genre == "Rock") getTracks(rock);
                  if (genre == "Dance") getTracks(dance);
                  if (genre == "Todos") getTracks(todos);
                }}
              >
                {genre}
              </Button>
            ))}
          </HStack>
        </Box>
        <Heading color="#FFCB37" bold mb="1">
          Music Library
        </Heading>
        <FlatList
          data={track}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pr="5"
              py="3"
            >
              <HStack space={3} justifyContent="space-between">
                <Avatar
                  size="48px"
                  source={{
                    uri: item.album.cover,
                  }}
                />
                <VStack>
                  <Text
                    isTruncated
                    maxW="200"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.title}
                  </Text>
                  <HStack space={3}>
                    <Text color="#707070">{item.artist.name} |</Text>
                    <Text color="#707070">{Time(item.duration)}</Text>
                  </HStack>
                </VStack>
                <Spacer />
                <IconButton
                  onPress={() => {
                    onClickShowModal(item);
                  }}
                  icon={
                    <ChevronRightIcon
                      name="addMusic"
                      color="#1A1A1C"
                      size="sm"
                    />
                  }
                  _hover={{ bg: "transparent" }}
                  _pressed={{ bg: "transparent" }}
                />
              </HStack>
            </Box>
          )}
        />
        <MusicModal/>
      </Box>
    </Center>
  );
};

export default MusicLibrary;
