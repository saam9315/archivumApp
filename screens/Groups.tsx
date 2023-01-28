import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";

export default function Groups() {
  const themeMode = useColorScheme();
  const containerBgC = themeMode === "dark" ? "#1d2a38" : "#eaecf5";
  const containerNameTextColor = themeMode === "dark" ? "#15e8dd" : "#2e7ef2";
  return (
    <View style={[styles.container, { backgroundColor: containerBgC }]}>
      <Text style={[styles.title, { color: containerNameTextColor }]}>
        Groups screen
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
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
