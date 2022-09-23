import React from 'react';
import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import KeyParameterForm from '../components/FileUploadView/KeyParameterForm';

import { Text, View } from '../components/Themed';
import { KeyParameter, RootStackScreenProps } from '../types';

export default function KeyParameterInputScreen({ route }: any) {
  const containerParameters: KeyParameter[] = route.params.requiredParameters;
  const { displayName } = route.params;
  const colorScheme = useColorScheme();
  const containerBackgroundColor =
  colorScheme === "dark" ? "#161f28" : "#eaecf5";
  
  return (
    <SafeAreaView style={[ styles.mainContainer, { backgroundColor: colorScheme === "dark" ? "#161f28" : "#eaecf5" }]}>
<KeyParameterForm containerParameters={containerParameters} />
      <View style={[ styles.buttonContainer, { backgroundColor: colorScheme === "dark" ? "#161f28" : "#eaecf5" }]}>
        <Pressable style={styles.submitButton} onPress={() => {}}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </View>
      </SafeAreaView>


  )
}
/*<View style={styles.container}>
<Text style={styles.title}>This screen doesn't exist.</Text>
<TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
  <Text style={styles.linkText}>Go to home screen!</Text>
</TouchableOpacity>
</View>*/ 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
