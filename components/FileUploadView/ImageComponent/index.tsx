import { Button, StyleSheet, Image, View, useColorScheme, Pressable, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSetRecoilState } from "recoil";
import { selectedFileAtom } from "../../../stores/Atoms";
import { useNavigation } from "@react-navigation/native";
import { Container, ContainerProps, file } from "../../../types";

export default function ImageComponent(container: any) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const setFile = useSetRecoilState<file>(selectedFileAtom);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFile(result);
      setIsButtonDisabled(false);
      //console.log(result);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    // Explore the result
    //console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFile(result)
      setIsButtonDisabled(false);
      //console.log(result.uri);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        {pickedImagePath !== "" && (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an existing image" />
        <Button onPress={openCamera} title="Open camera" />
      </View>
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: colorScheme === "dark" ? "#161f28" : "#eaecf5" },
        ]}
      >
        <Pressable
          style={[styles.nextButton, { backgroundColor: isButtonDisabled ? 'grey' : '#2e7cf2' }]}
          onPress={() =>
            navigation.navigate("KeyParameterInputScreen", container)
          }
          disabled={isButtonDisabled}
        >
          <Text style={[styles.nextButtonText, { color: isButtonDisabled ? 'lightgrey' : '#fff' },]}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    bottom: 100,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "contain",
  },
  nextButton: {
    width: 200,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  nextButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
  },
});
