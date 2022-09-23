import {
  Button,
  StyleSheet,
  Image,
  View,
  useColorScheme,
  Pressable,
  Text
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSetRecoilState } from "recoil";
import { selectedFileAtom } from "../../../stores/Atoms";
import { useNavigation } from "@react-navigation/native";

export default function ImageComponent ({ route }: any) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const setFileName = useSetRecoilState<string>(selectedFileAtom);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFileName(result.uri.substring(result.uri.lastIndexOf("/") + 1));
      console.log(result.uri);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFileName(result.uri.substring(result.uri.lastIndexOf("/") + 1));
      console.log(result.uri);
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
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("KeyParameterInputScreen", route.params)
          }
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'red',
  },
  buttonContainer: {
    //backgroundColor: 'green',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    backgroundColor: "lightblue",
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
    backgroundColor: "#2e7cf2",
    margin: 10,
  },
  nextButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});
