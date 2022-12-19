import { StyleSheet, Image, View, useColorScheme } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedFileAtom,
  suggestedValuesAtom,
  tempEntityKeyAtom,
  userTokenAtom,
} from "../../../stores/Atoms";
import { useNavigation } from "@react-navigation/native";
import { file } from "../../../types";
import { TokenResponse } from "expo-auth-session";
import { FileSystemUploadResult } from "expo-file-system";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { useAuth } from "../../../contexts/Auth";

export default function ImagePickComponent(container: any) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const setFile = useSetRecoilState<file>(selectedFileAtom);
  const setTempEntityKey = useSetRecoilState(tempEntityKeyAtom);
  const setSuggestedValues = useSetRecoilState(suggestedValuesAtom);
  const userToken = useRecoilValue(userTokenAtom);
  if (userToken) var userAccessToken = new TokenResponse(userToken);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const currContainer = container.container;
  const auth = useAuth();

  const handleNext = async () => {
    setIsButtonLoading(true);
    setIsButtonDisabled(true);
    try {
      if (!userAccessToken.shouldRefresh()) {
        let TOKEN = `Bearer ${userAccessToken.accessToken}`;
        const BASE_URL = process.env.REACT_APP_ENTITIES_BASE_URL;
        const entityLandingZoneUrl = `${BASE_URL}/landing-zone/${currContainer.name}`;
        const res: FileSystemUploadResult = await FileSystem.uploadAsync(
          entityLandingZoneUrl,
          pickedImagePath,
          {
            fieldName: "file",
            httpMethod: "POST",
            headers: {
              authorization: TOKEN,
            },
          }
        );
        if (res.status === 200) {
          console.log(JSON.parse(res.body));
          setSuggestedValues(JSON.parse(res.body).suggestedValues);
          setTempEntityKey(JSON.stringify(JSON.parse(res.body).tempEntityKey));
          setIsButtonLoading(false);
          setIsButtonDisabled(false);
          navigation.navigate("KeyParameterInputScreen", container);
        } else {
          Toast.show(res.body, {
            textStyle: {
              fontSize: 18,
            },
            duration: Toast.durations.LONG,
            backgroundColor: "red",
          });
          setIsButtonDisabled(false);
          setIsButtonLoading(false);
        }
      } else {
        Toast.show("Unauthorised!", {
          textStyle: {
            fontSize: 18,
          },
          duration: Toast.durations.LONG,
          backgroundColor: "red",
        });
        setIsButtonLoading(false);
        setIsButtonDisabled(false);
        auth.signOut();
      }
    } catch (error) {
      Toast.show(JSON.stringify(error), {
        textStyle: {
          fontSize: 18,
        },
        duration: Toast.durations.LONG,
        backgroundColor: "red",
      });
      setIsButtonLoading(false);
      setIsButtonDisabled(false);
    }
  };

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFile(result);
      setIsButtonDisabled(false);
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

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: false,
      quality: 1,
    });
    // Explore the result
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFile(result);
      setIsButtonDisabled(false);
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
        <Button
          uppercase={false}
          color={"#2e7ef2"}
          labelStyle={{
            fontFamily: "Muli-Bold",
          }}
          onPress={showImagePicker}
        >
          Select an existing image
        </Button>
        <Button
          uppercase={false}
          color={"#2e7ef2"}
          labelStyle={{
            fontFamily: "Muli-Bold",
          }}
          onPress={openCamera}
        >
          Open camera
        </Button>
      </View>
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: colorScheme === "dark" ? "#161f28" : "#eaecf5" },
        ]}
      >
        <Button
          style={[
            styles.nextButton,
            { backgroundColor: isButtonDisabled ? "grey" : "#2e7cf2" },
          ]}
          labelStyle={{
            fontFamily: "Muli-Bold",
            color: isButtonLoading ? "lightgrey" : "white",
          }}
          uppercase={false}
          disabled={isButtonDisabled}
          loading={isButtonLoading}
          onPress={handleNext}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: "50%",
    justifyContent: "center",
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
  },
  nextButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: "Muli-Regular",
  },
});
