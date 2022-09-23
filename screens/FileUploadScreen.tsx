import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, View } from "../components/Themed";
import KeyParameterForm from "../components/FileUploadView/KeyParameterForm";
import { KeyParameter, RootTabScreenProps } from "../types";
import ImageComponent from "../components/FileUploadView/ImageComponent";
import { useNavigation } from "@react-navigation/native";

export default function FileUploadScreen({ route }: any) {
  const containerParameters: KeyParameter[] = route.params.requiredParameters;
  const { displayName, description } = route.params;
  console.log(description)
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const containerBackgroundColor =
    colorScheme === "dark" ? "#161f28" : "#eaecf5";

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        { backgroundColor: colorScheme === "dark" ? "yellow" : "#eaecf5" },
      ]}
    >
      <View style={[styles.titleContainer, { backgroundColor: colorScheme === "dark" ? "red" : "#eaecf5" }]}>
      <Text style={styles.title}>Container name: {displayName}</Text>
      <Text style={styles.title}>Description: {description}</Text>
      <View style={styles.separator} lightColor="black" darkColor="grey" />
      </View>
      <ImageComponent></ImageComponent>
      <View style={[ styles.buttonContainer, { backgroundColor: colorScheme === "dark" ? "#161f28" : "#eaecf5" }]}>
        <Pressable style={styles.submitButton} onPress={() => navigation.navigate('KeyParameterInputScreen', route.params)}>
          <Text style={styles.submitButtonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0

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
  submitButton: {
    width: 200,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e7cf2',
    margin: 10,
},
buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',

},
submitButtonText: {
    fontSize: 18,
    color: '#fff',
},
});
