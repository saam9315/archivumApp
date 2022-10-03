import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Text, View
} from "react-native";
import ImageComponent from "../components/FileUploadView/ImageComponent";
import Separator from "../components/Separator";
import { Container } from "../types";

export default function FileUploadScreen({ route }: any) {
  const container: Container = route.params.container;
  console.log(container)
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
        <Text style={styles.title}>Container name: {container.displayName}</Text>
        {/*<Text style={styles.title}>Description: {description}</Text>*/}
        <Separator />
      </View>
      <ImageComponent container={container} ></ImageComponent>
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
    bottom: 750,

  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 20
  },
  separator: {
    height: 1,
    width: "75%",
    marginTop: 20

  },
});
