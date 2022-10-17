import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from "react-native";
import Separator from "../components/Separator";
import Colors from "../constants/Colors";
import ImageComponent from "../modules/FileUpload/ImageComponent";
import { Container } from "../types";

export default function FileUploadScreen({ route }: any) {
  const container: Container = route.params.container;
  const colorScheme = useColorScheme();
  const containerBackgroundColor =
    colorScheme === "dark"
      ? Colors.dark.containerBackground
      : Colors.light.containerBackground;

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        { backgroundColor: containerBackgroundColor },
      ]}
    >
      <View
        style={[
          styles.titleContainer,
          { backgroundColor: containerBackgroundColor },
        ]}
      >
        <Text style={styles.title}>Container: {container.displayName}</Text>
        <Separator />
      </View>
      <ImageComponent container={container}></ImageComponent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 730,
  },
  title: {
    fontSize: 18,
    paddingBottom: 15,
    fontFamily: "Muli-Bold",
    color: "#2e7ef2",
  },
});
