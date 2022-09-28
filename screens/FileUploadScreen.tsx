import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, View } from "../components/Themed";
import ImageComponent from "../components/FileUploadView/ImageComponent";

export default function FileUploadScreen({ route }: any) {
  const { displayName, description } = route.params;
  const colorScheme = useColorScheme();
  const containerBackgroundColor =
    colorScheme === "dark" ? "#161f28" : "#eaecf5";

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        { backgroundColor: colorScheme === "dark" ? "#161f28" : "#eaecf5" },
      ]}
    >
      <View style={[styles.titleContainer, { backgroundColor: containerBackgroundColor }]}>
        <Text style={styles.title}>Container name: {displayName}</Text>
        {/*<Text style={styles.title}>Description: {description}</Text>*/}
        <View style={styles.separator} lightColor="black" darkColor="grey" />
      </View>
      <ImageComponent route={route} ></ImageComponent>
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 750

  },
  title: {
    fontSize: 20,
    paddingTop: 10,
  },
  separator: {
    height: 1,
    width: "75%",
    marginTop: 20

  },
});
