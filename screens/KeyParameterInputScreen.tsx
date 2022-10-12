import React from "react";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import KeyParameterForm from "../modules/FileUpload/KeyParameterForm";
import { Container } from "../types";

export default function KeyParameterInputScreen({ route }: any) {
  const container: Container = route.params.container;
  const colorScheme = useColorScheme();
  const containerBackground =
    colorScheme === "dark"
      ? Colors.dark.containerBackground
      : Colors.light.containerBackground;

  return (
    <SafeAreaView
      style={[styles.mainContainer, { backgroundColor: containerBackground }]}
    >
      <KeyParameterForm container={container} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
