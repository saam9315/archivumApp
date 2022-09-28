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
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: colorScheme === "dark" ? "#161f28" : '#eaecf5' }]}>
      <KeyParameterForm containerParameters={containerParameters} />
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
  mainContainer: {
    flex: 1,
  },
});
