import { Button, StyleSheet, Image, View, useColorScheme } from "react-native";
import { TextInput } from 'react-native-paper';
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSetRecoilState } from "recoil";
import { selectedFileAtom } from "../../../stores/Atoms";

const ImageComponent = () => {
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState("");
    const setFileName = useSetRecoilState<string>(selectedFileAtom);
    const colorScheme = useColorScheme();

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
            setFileName(result.uri.substring(result.uri.lastIndexOf("/") + 1))
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
            setFileName(result.uri.substring(result.uri.lastIndexOf("/") + 1))
            console.log(result.uri);
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                {
                    pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.image}
                    />
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={showImagePicker} title="Select an existing image" />
                <Button onPress={openCamera} title="Open camera" />
            </View>
        </View>
    );
};

export default ImageComponent;

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    buttonContainer: {
        //backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        backgroundColor: 'lightblue',
        bottom: 100
        
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: 'contain'
    }
});
