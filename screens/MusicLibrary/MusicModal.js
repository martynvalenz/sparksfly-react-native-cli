import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSong } from "../../redux/slices/musicSlice";
import {
  Modal,
  Box,
  HStack,
  VStack,
  Avatar,
  Text,
  Spacer,
  Button,
  NativeBaseProvider,
  extendTheme,
  Center,
} from "native-base";
import TrimmerC from "./Trimmer";

const MusicModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.music);

  const onClickCloseModal = () => {
    const stateModal = {
      modal: false,
      audioPlay: false,
    };
    dispatch(setSong(stateModal));
    //console.log("cierro el modal y convierto el state a falso");
    //console.log(modalState.audioPlay);
  };

  const theme = extendTheme({
    components: {
      Button: {
        baseStyle: {
          backgroundColor: "#FFCB37",
          rounded: "full",
        },
      },
    },
  });

  return (
    <>
      <Center>
        <Modal
          isOpen={modalState.modal}
          justifyContent="flex-end"
          size="full"
          marginBottom="0"
          marginTop="auto"
        >
          <Modal.Content>
            <Modal.Body backgroundColor="#fff">
              <Box backgroundColor="#fff" pr="5" py="3">
                <VStack space={2}>
                  <HStack space={1} justifyContent="space-between">
                    <Avatar
                      size="48px"
                      source={{
                        uri: modalState.cover,
                      }}
                    />
                    <VStack>
                      <Text
                        isTruncated
                        maxW="150"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {modalState.name}
                      </Text>
                      <HStack space={2}>
                        <Text color="#707070">{modalState.artist} |</Text>
                        <Text color="#707070">time</Text>
                      </HStack>
                    </VStack>
                    <Spacer />
                    <NativeBaseProvider theme={theme}>
                      <Button
                        variant="rounded"
                        size="md"
                        onPress={() => {
                          onClickCloseModal();
                        }}
                      >
                        Use
                      </Button>
                    </NativeBaseProvider>
                  </HStack>
                  <TrimmerC />
                </VStack>
              </Box>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
};

export default MusicModal;
