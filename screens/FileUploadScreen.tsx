import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Text, View
} from "react-native";
import Separator from "../components/Separator";
import ImageComponent from "../modules/FileUpload/ImageComponent";

import { Container } from "../types";

export default function FileUploadScreen({ route }: any) {
  const container: Container = route.params.container;
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
        {/*<Text style={styles.title}>Description: {container.description}</Text>*/}
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
    position: 'absolute',
    bottom: 730,

  },
  title: {
    fontSize: 18,
    paddingTop: 10,
    fontFamily: 'Muli-Regular',
    color: '#2e7ef2'
  },
});
