import { SafeAreaView, useColorScheme, StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../components/Themed";

export default function EntitiesTableScreen() {
  const themeMode = useColorScheme();
  const containerBgC = themeMode === "dark" ? "#1d2a38" : "#eaecf5";
  const containerNameTextColor = themeMode === "dark" ? "#15e8dd" : "#2e7ef2";
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: containerBgC }]}>
      <Text style={[styles.title, { color: containerNameTextColor }]}>
        Entities Table
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Muli-Bold",
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
